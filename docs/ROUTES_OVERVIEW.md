# TapOnce - Routes Overview

> **Purpose:** Complete mapping of all application routes  
> **Last Updated:** January 19, 2026

---

## 🗺️ Route Map

```
/                           → (Future) Landing Page
/login                      → Login Page
/logout                     → Logout Handler
/unauthorized               → Unauthorized Access Page

/admin                      → Admin Dashboard Home
/admin/orders               → Order Management (Kanban)
/admin/customers            → Customer Management
/admin/agents               → Agent Management
/admin/finance              → Financial Dashboard
/admin/catalog              → Card Catalog Management
/admin/inbox                → Inbox & Notifications

/agent                      → Agent Dashboard Home
/agent/orders               → Order Tracking
/agent/orders/new           → Submit New Order
/agent/catalog              → Agent Card Catalog
/agent/network              → Sub-Agent Network
/agent/payouts              → Payout Management

/dashboard                  → Customer Dashboard Home
/dashboard/profile          → Profile Editor
/dashboard/preview          → Preview Public Page
/dashboard/download         → Download Portfolio

/[slug]                     → Public Tap View (e.g., /rahul-verma)
```

---

## 📋 Detailed Route Reference

### 🔓 Public Routes (No Auth Required)

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `/` | `app/(marketing)/page.tsx` | Landing page | 🔲 Pending |
| `/[slug]` | `app/(public)/[slug]/page.tsx` | Public profile (NFC tap) | ✅ Complete |
| `/login` | `app/login/page.tsx` | Login form | ✅ Complete |
| `/logout` | `app/logout/page.tsx` | Session logout | ✅ Complete |
| `/unauthorized` | `app/unauthorized/page.tsx` | Access denied | ✅ Complete |

---

### 👑 Admin Routes (Admin Only)

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `/admin` | `app/admin/page.tsx` | Dashboard home with stats | ✅ Complete |
| `/admin/orders` | `app/admin/orders/page.tsx` | Kanban board | ✅ Complete |
| `/admin/customers` | `app/admin/customers/page.tsx` | Customer list | ✅ Complete |
| `/admin/agents` | `app/admin/agents/page.tsx` | Agent management | ✅ Complete |
| `/admin/finance` | `app/admin/finance/page.tsx` | Revenue & expenses | ✅ Complete |
| `/admin/catalog` | `app/admin/catalog/page.tsx` | Card designs | ✅ Complete |
| `/admin/inbox` | `app/admin/inbox/page.tsx` | Notifications | ✅ Complete |

**Layout:** `app/admin/layout.tsx` - Sidebar navigation with logout

---

### 🤝 Agent Routes (Agent Only)

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `/agent` | `app/agent/page.tsx` | Dashboard home | ✅ Complete |
| `/agent/orders` | `app/agent/orders/page.tsx` | Order tracking | ✅ Complete |
| `/agent/orders/new` | `app/agent/orders/new/page.tsx` | Submit order form | ✅ Complete |
| `/agent/catalog` | `app/agent/catalog/page.tsx` | Card catalog view | ✅ Complete |
| `/agent/network` | `app/agent/network/page.tsx` | Sub-agent network | ✅ Complete |
| `/agent/payouts` | `app/agent/payouts/page.tsx` | Payout management | ✅ Complete |

**Layout:** `app/agent/layout.tsx` - Sidebar navigation with logout

---

### 👤 Customer Routes (Customer Only)

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `/dashboard` | `app/dashboard/page.tsx` | Dashboard home | ✅ Complete |
| `/dashboard/profile` | `app/dashboard/profile/page.tsx` | Edit profile | ✅ Complete |
| `/dashboard/preview` | `app/dashboard/preview/page.tsx` | Preview public page | ✅ Complete |
| `/dashboard/download` | `app/dashboard/download/page.tsx` | Download portfolio | ✅ Complete |

**Layout:** `app/dashboard/layout.tsx` - Tab navigation with logout

---

## 🔐 Route Protection (Middleware)

The middleware at `src/middleware.ts` enforces:

```typescript
// Role-based route matching
/admin/*    → Requires 'admin' role
/agent/*    → Requires 'agent' role
/dashboard/* → Requires 'customer' role
```

**Behavior:**
- Unauthenticated → Redirect to `/login`
- Wrong role → Redirect to `/unauthorized`
- Already logged in on `/login` → Redirect to role's home

---

## 🔄 Navigation Flows

### Login Flow
```
/login → Auth Check → Role Detection → 
  ├── Admin    → /admin
  ├── Agent    → /agent
  └── Customer → /dashboard
```

### Agent Order Flow
```
/agent → "Submit New Order" → /agent/orders/new → Submit → /agent/orders
```

### Customer Profile Flow
```
/dashboard → "Edit Profile" → /dashboard/profile → 
  → "Preview" → /dashboard/preview → 
  → "Download" → /dashboard/download
```

### Public Tap Flow
```
NFC Tap → /[slug] → View Profile → 
  ├── Save Contact → Download .vcf
  ├── Social Links → External URLs
  └── Get Your Card → /
```

---

## 📱 Mobile-Friendly Routes

| Route | Mobile Optimized |
|-------|------------------|
| `/[slug]` (Public Tap) | ✅ Full mobile-first design |
| `/agent/*` | ✅ Responsive sidebar |
| `/dashboard/*` | ✅ Tab navigation |
| `/admin/*` | ⚠️ Desktop-first (works on mobile) |

---

## 🔗 Related Docs

- [FEATURES_COMPLETED.md](./FEATURES_COMPLETED.md) - What each route does
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Folder structure
- [API_CONTRACTS.md](./API_CONTRACTS.md) - API routes
