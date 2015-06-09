# Bill-organizer

[Heroku link][heroku]

[heroku]: TODO

## Minimum Viable Product
Bill organizer is a Rails and Backbone web application built for the simple purpose of aiding and organizing household bills amongst roommates.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create bills
- [ ] Calculate bills in differing currencies & bill types    (electricity, water, etc)
- [ ] Add bills to user profiles
- [ ] Email invoices to both users and nonusers
- [ ] View and Search bills owned by current user
- [ ] Link bills through unique identifier that anyone can view
- [ ] Mark bills as paid

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Bill Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, anyone will be able to create bills and calculate bills using
a simple text form in a Rails view. Logged in users will be able to create bills, but anyone can view bills given the url. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: CRUD bills within Backbone, bill calculations (~2 days)
I will add API routes to serve bill data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create, delete, and edit bills all
inside a single Backbone app. Created bills will be associated with the current user, and only the bill creator will be allowed to edit the bill. If a marked roommate of a bill is an associated user of the database (based on email), we will create a follower association so that this user can view the bill under his or her profile as well.

[Details][phase-two]

### Phase 3: Add nav bar (~1 days)
I will add a navigation bar that will show users if any unread bills have been linked to them, link to profile, allow for sign out, creation of bills, and searching for bills.

[Details][phase-three]

### Phase 4: User Profile Options, Linking other users (~1-2 days)
I will add a nav bar for logged in users. Users will be able to view all previously created bills, send reminder emails. Other users can follow a bill.

[Details][phase-four]

### Phase 5: Search Bar for previous bills (~2 days)
I'll need to add `search` routes to the Bill controller. On the
Backbone side, there will be a search bar where users can type in the unique identifier of a bill and find it.

[Details][phase-five]

### Phase 6: Add mailer (~1 day)
I will need to add a mailer to ensure that invoices can be sent to a bill's associated roommates.

### Bonus Features (TBD)
- [ ] Integrate Venmo or other person-to-person payment option
- [ ] User stats on bill history

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
