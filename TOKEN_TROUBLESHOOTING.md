# Token Permission Issue - Solution Guide

## The Problem
Your API token doesn't have "create" permissions, even though you set it as "Editor". This can happen for a few reasons:

## Solutions to Try

### Solution 1: Create a NEW Token with Correct Settings

1. **Go to:** https://sanity.io/manage/project/ryc5e4q2/api/tokens

2. **Delete the old token** (if you created one already)

3. **Create a NEW token** with these EXACT settings:
   - **Label:** Development Token
   - **Permissions:** **Administrator** (not just Editor)
   - **Description:** For local development and data uploads
   
4. **Copy the token** immediately

5. **Update `.env.local`:**
   - Replace the entire `SANITY_API_TOKEN` line with the new token
   - Make sure there are NO spaces before or after the token
   - Make sure the token is on ONE line

6. **Run the upload script again:**
   ```bash
   npm run upload-data
   ```

### Solution 2: Use Sanity Import Tool (Alternative)

If the token continues to have issues, we can use Sanity's built-in import tool:

1. First, let me create an import file with the data
2. Then use `sanity dataset import` command

Would you like me to create this alternative approach?

### Solution 3: Manual Studio Entry (Slowest but Works)

As a last resort, you can:
1. Start Sanity Studio: `cd sanity-studio && npm run dev`
2. Open http://localhost:3333
3. Manually create a few sample documents to see your website

## Common Token Issues

❌ **Token created under wrong account** - Make sure you're logged into the right Sanity account

❌ **Token for wrong project** - The token MUST be for project `ryc5e4q2`

❌ **Token permissions too restrictive** - Use "Administrator" instead of "Editor"

❌ **Token for wrong dataset** - Should be for "production" dataset

❌ **Whitespace in .env file** - Make sure no extra spaces around the token

## Verify Your Token

The token should:
- Start with `sk` followed by random characters
- Be about 150-200 characters long
- Be created specifically for project ID: `ryc5e4q2`
- Have "Administrator" permissions

## Need Help?

If none of these work, share:
1. Screenshot of the token creation screen (hide the token value itself)
2. The exact error message you're getting
3. Which permission level you selected

---

**Quick Test:** Try creating a token with "Administrator" permissions instead of "Editor" - some Sanity projects require this higher permission level for creating documents.
