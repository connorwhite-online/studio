# Spotify API Integration

This endpoint fetches the user's most recently liked songs (Saved Tracks) from the Spotify API.

## Required Scopes

For this API to work properly, your Spotify refresh token must have the following scopes:
- `user-library-read` - Required to access the user's saved tracks (Liked Songs)

## Checking Your Current Token Scopes

If you're seeing the "Could not load Spotify tracks" error, it's likely that your refresh token doesn't have the required `user-library-read` scope.

You can check your token's scopes using the provided utility script, which automatically reads your credentials from `.env.local`:

```bash
# Run from the project root directory
npx ts-node --project tsconfig.json app/api/spotify/check-token.ts
```

The script will:
1. Read your Spotify credentials from `.env.local`
2. Verify the token's scopes
3. Test if you can access the saved tracks endpoint
4. Display detailed information about any issues found

## Updating Your Spotify Token

If your current token doesn't have the required scopes, you'll need to generate a new one:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new app or select your existing app
3. Set the Redirect URI to `http://localhost:3000/callback`
4. Note your Client ID and Client Secret

5. Use the following URL to request authorization (replace `YOUR_CLIENT_ID` with your actual client ID):
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-library-read
   ```

6. After authorization, you'll be redirected to your callback URL with a code parameter in the URL. Copy this code.

7. Exchange the code for a refresh token using a cURL command (or Postman):
   ```bash
   # Replace YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, and YOUR_CODE with your actual values
   curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Authorization: Basic $(echo -n YOUR_CLIENT_ID:YOUR_CLIENT_SECRET | base64)" \
     -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/callback" \
     https://accounts.spotify.com/api/token
   ```

   For Windows PowerShell:
   ```powershell
   # Replace YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, and YOUR_CODE with your actual values
   $encoded = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("YOUR_CLIENT_ID:YOUR_CLIENT_SECRET"))
   $headers = @{
       "Authorization" = "Basic $encoded"
       "Content-Type" = "application/x-www-form-urlencoded"
   }
   $body = "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=http://localhost:3000/callback"
   Invoke-RestMethod -Uri "https://accounts.spotify.com/api/token" -Method Post -Headers $headers -Body $body
   ```

8. From the response, copy the `refresh_token` value and update your `.env.local` file:
   ```
   SPOTIFY_REFRESH_TOKEN=your_new_refresh_token
   ```

9. After updating the token, run the check-token script again to verify that everything is working:
   ```bash
   npx ts-node --project tsconfig.json app/api/spotify/check-token.ts
   ```

## Troubleshooting

If you're still having issues after updating your token:

1. Check the browser console for more detailed error messages
2. Verify that your `.env.local` file has the correct values for:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`
3. Make sure you're not accidentally using a token from a different Spotify app
4. Check that you have liked songs in your Spotify library (the API won't return anything if there are no liked songs)
5. Try running the `check-token.ts` script again to verify your token is working 