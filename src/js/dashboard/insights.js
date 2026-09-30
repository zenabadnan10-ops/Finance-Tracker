const CURRENCY = 'Rs.';
const MAX_PER_TONE = 1;
const RECOMMENDED_SAVINGS_RATE = 20; 
const MEANINGFUL_CHANGE = 10; 
const NEAR_LIMIT = 0.8; 

const TONE_LABEL = {
  positive: 'Good news',
  neutral: 'Tip',
  negative: 'Warning',
};

const ICONS = {
  positive: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  neutral:
    '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  negative:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
};


const money = (n) => `${CURRENCY} ${Math.round(n).toLocaleString('en-PK')}`;
const pct0 = (n) => `${Math.round(n)}%`;
const pct1 = (n) => `${Math.round(n * 10) / 10}%`;
const label = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Uncategorised');

function toDate(value) {
  const [y, m, d] = String(value).slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

function normalise(transactions) {
  return transactions
    .map((t) => ({ ...t, amount: Number(t.amount) || 0, date: toDate(t.date) }))
    .filter((t) => !Number.isNaN(t.date.getTime()));
}

function total(list, type, from, to, category) {
  return list
    .filter(
      (t) =>
        t.type === type &&
        t.date >= from &&
        t.date < to &&
        (category === undefined || t.category === category)
    )
    .reduce((sum, t) => sum + t.amount, 0);
}

function periodStart(period, today) {
  const y = today.getFullYear();
  const m = today.getMonth();
  if (period === 'weekly') {
    const daysSinceMonday = (today.getDay() + 6) % 7;
    return new Date(y, m, today.getDate() - daysSinceMonday);
  }
  if (period === 'yearly') return new Date(y, 0, 1);
  return new Date(y, m, 1);
}

export function buildInsights(transactions = [], budgets = [], now = new Date()) {
  const tx = normalise(transactions);
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  const today = new Date(y, m, d);
  const tomorrow = new Date(y, m, d + 1);
  const monthStart = new Date(y, m, 1);
  const prevStart = new Date(y, m - 1, 1);
  const daysInPrevMonth = new Date(y, m, 0).getDate();

  const prevCutoff = new Date(y, m - 1, Math.min(d, daysInPrevMonth) + 1);

  const out = [];
  const add = (tone, text, weight = 0) => out.push({ tone, text, weight });

  const income = total(tx, 'income', monthStart, tomorrow);
  const spent = total(tx, 'expense', monthStart, tomorrow);
  const monthExpenses = tx.filter(
    (t) => t.type === 'expense' && t.date >= monthStart && t.date < tomorrow
  );

  if (income > 0) {
    const rate = ((income - spent) / income) * 100;
    if (rate >= RECOMMENDED_SAVINGS_RATE) {
      const how = rate >= RECOMMENDED_SAVINGS_RATE + 10 ? 'well above' : 'above';
      add(
        'neutral',
        `Your savings rate is currently ${pct1(rate)} — ${how} the recommended ${RECOMMENDED_SAVINGS_RATE}%.`,
        100
      );
    } else if (rate >= 0) {
      add(
        'neutral',
        `Your savings rate is currently ${pct1(rate)} — below the recommended ${RECOMMENDED_SAVINGS_RATE}%.`,
        100
      );
    } else {
      add('negative', `You've spent ${money(spent - income)} more than you earned this month.`, 1000);
    }
  } else if (spent > 0) {
    add('neutral', `No income recorded this month, but you've spent ${money(spent)}.`, 100);
  }

  const categories = [...new Set(tx.filter((t) => t.type === 'expense').map((t) => t.category))];
  categories.forEach((cat) => {
    const before = total(tx, 'expense', prevStart, prevCutoff, cat);
    if (!(before > 0)) return;
    const now_ = total(tx, 'expense', monthStart, tomorrow, cat);
    const change = ((now_ - before) / before) * 100;
    const name = cat.toLowerCase();
    if (change <= -MEANINGFUL_CHANGE) {
      add('positive', `You're spending ${pct0(-change)} less on ${name} than last month.`, -change);
    } else if (change >= MEANINGFUL_CHANGE) {
      add('negative', `You're spending ${pct0(change)} more on ${name} than last month.`, change);
    }
  });

  if (spent > 0) {
    const byCategory = {};
    monthExpenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });
    const [topCat, topAmount] = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    add(
      'neutral',
      `${label(topCat)} is your biggest expense, at ${pct0((topAmount / spent) * 100)} of this month's spending.`,
      10
    );
  }

  const withinLimit = [];
  budgets.forEach((b) => {
    const limit = Number(b.limit);
    if (!(limit > 0)) return;
    const period = b.period || 'monthly';
    const used = total(tx, 'expense', periodStart(period, today), tomorrow, b.category);
    const ratio = used / limit;
    const name = label(b.category);

    if (ratio > 1) {
      add('negative', `${name} spending has gone over your ${period} budget.`, 200 + ratio);
    } else if (ratio >= NEAR_LIMIT) {
      add('negative', `${name} spending is close to your ${period} budget.`, 100 + ratio);
    } else {
      withinLimit.push({ name, period });
    }
  });

  return out;
}

function createItem({ tone, text }) {
  const item = document.createElement('div');
  item.className = 'insight-item';
  item.dataset.tone = tone;
  item.setAttribute('role', 'listitem');

  const icon = document.createElement('span');
  icon.className = 'insight-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML =
    `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[tone]}</svg>`;

  const message = document.createElement('p');
  message.className = 'insight-text';
  const toneText = document.createElement('span');
  toneText.className = 'sr-only';
  toneText.textContent = `${TONE_LABEL[tone]}: `;
  message.append(toneText, text);

  item.append(icon, message);
  return item;
}

export function renderInsights(transactions, budgets) {
  const root = document.getElementById('dashboard-eight-section');
  if (!root) return;

  const emptyState = root.querySelector('.no-insights');
  const wrapper = root.querySelector('.insights');
  const slots = {
    positive: root.querySelector('.positive-insight'),
    neutral: root.querySelector('.neutral-insight'),
    negative: root.querySelector('.negative-insight'),
  };

  const insights = buildInsights(transactions, budgets);

  Object.entries(slots).forEach(([tone, slot]) => {
    if (!slot) return;
    const items = insights
      .filter((i) => i.tone === tone)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, MAX_PER_TONE);
    slot.replaceChildren(...items.map(createItem));
    slot.hidden = items.length === 0;
  });

  wrapper.setAttribute('role', 'list');
  wrapper.setAttribute('aria-label', 'Financial insights');
  wrapper.hidden = insights.length === 0;
  if (emptyState) emptyState.hidden = insights.length > 0;
}