# Page snapshot

```yaml
- banner:
  - textbox "Search..."
- button
- navigation "POST":
  - text: POST
  - button "General"
  - text: Pages
  - button "User User management"
- main:
  - heading "Sign In" [level=1]
  - heading "Welcome back, please enter your credentials to sign in." [level=6]
  - text: Email
  - textbox "Email"
  - text: Password
  - textbox "Password"
  - button "Sign In"
  - paragraph:
    - text: Don’t have an account?
    - link "Sign Up":
      - /url: /sign-up
  - text: Powered by Clerk
- alert
```