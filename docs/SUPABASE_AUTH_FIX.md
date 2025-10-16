# Supabase Authentication Fix for Deployment

## Problem
Email confirmation links don't work on the deployed site (eco-linda.vercel.app) because Supabase is redirecting to localhost instead of the production URL.

## Solution

### 1. Code Changes ✅
The `src/lib/supabase.js` file has been updated to include proper redirect configuration.

### 2. Supabase Dashboard Configuration (REQUIRED)

You **MUST** configure these settings in your Supabase Dashboard:

#### Step 1: Go to Supabase Dashboard
1. Visit https://supabase.com/dashboard
2. Select your EcoLinda project
3. Go to **Authentication** → **URL Configuration**

#### Step 2: Add Redirect URLs
Add the following URLs to **Redirect URLs**:
```
https://eco-linda.vercel.app
https://eco-linda.vercel.app/**
http://localhost:3001
http://localhost:3001/**
```

#### Step 3: Update Site URL
Set **Site URL** to:
```
https://eco-linda.vercel.app
```

#### Step 4: Email Templates (Optional but Recommended)
Go to **Authentication** → **Email Templates** and update the confirmation email template:

**Confirmation Email:**
- Change any hardcoded URLs from `localhost` to `{{ .SiteURL }}`
- The confirmation link should use: `{{ .ConfirmationURL }}`

Example template:
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email address</a></p>
```

### 3. Vercel Environment Variables

Make sure these are set in your Vercel project settings:

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add:
- `VITE_SUPABASE_URL` = Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` = Your Supabase anon public key

### 4. Redeploy

After making the Supabase dashboard changes:
1. Commit and push your code changes
2. Vercel will auto-deploy, OR
3. Manually trigger a redeploy in Vercel dashboard

### 5. Test

1. Go to https://eco-linda.vercel.app
2. Sign up with a new email
3. Check your email
4. Click the confirmation link
5. You should be redirected back to the app and logged in

## Additional Notes

### PKCE Flow
The code now uses PKCE (Proof Key for Code Exchange) flow which is more secure for public clients like web apps.

### Session Persistence
Sessions are automatically persisted in localStorage and will survive page refreshes.

### URL Detection
The app will automatically detect auth tokens in the URL after email confirmation.

## Troubleshooting

### Still not working?
1. **Clear browser cache and cookies**
2. **Check Supabase logs**: Dashboard → Logs → Auth Logs
3. **Verify environment variables** are set in Vercel
4. **Check browser console** for any errors
5. **Try in incognito mode** to rule out cached data

### Common Issues:

**Issue**: "Invalid redirect URL"
- **Fix**: Make sure you added the exact URL to Supabase redirect URLs list

**Issue**: Email link redirects to localhost
- **Fix**: Update Site URL in Supabase to your production URL

**Issue**: "Email not confirmed"
- **Fix**: In Supabase Dashboard → Authentication → Settings, check if "Enable email confirmations" is on

### Need to disable email confirmation for testing?
In Supabase Dashboard:
- Go to **Authentication** → **Settings**
- Turn off "Enable email confirmations"
- ⚠️ **Remember to turn it back on for production!**

## Security Notes

✅ PKCE flow is enabled for better security
✅ Auto token refresh is enabled
✅ Session persistence is secure (localStorage)
✅ Always use HTTPS in production

## Related Files
- `/src/lib/supabase.js` - Supabase client configuration
- `/src/pages/Auth.js` - Authentication UI
