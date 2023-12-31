# ApolloTickets - (Under Development)

#### MERN GraphQL Apollo Server / Apollo Client - Ticketing System

Fake company website - and ticketing system

## Todos

- App Styling

  - Responsive Styling

- Footer
- Outlets Layouts

## Feature Ideas

- Public Homepage
  - Products, Sales, Services etc Page
  - ~~Public-facing blog~~
- Developer Portal?
- ~~Agent Private Comments~~
- Agent Groups
  - ~~BE CRU resolvers~~
  - ~~FE/BE update Ticket to use Groups~~
  - Assign/Update Agents group(s)
    - ~~BE update Agents group(s)~~
    - FE update agents groups(s)
      - ~~profile display groups~~
      - admin edit groups
  - Admin Update Group
- Knownledge Base
  - ~~CRUD Knowledge Articles~~
    - ~~FE~~
    - ~~BE~~
  - FE Knowledge base for users
  - FE Knowledge base for agents
- Agent Admin Dashboard
- CRUD Users
- Ticket Feedback

  - ~~Ticket Review Model~~
  - ~~BE Create Review Type/Resolver~~
  - ~~BE Update Review Type/Resolver~~
  - ~~FE Submit Review~~
  - FE on ticket solve - ask user to rate ticket
  - send email?

- ~~Improve Search / Tickets~~

  - ~~handle search on BE~~
  - ~~update FE search to use BE search~~
    - add FE search for customers
  - ~~remove closed tickets from mytickets unless directly queried for~~

- Ticket Metrics
  - ~~BE logic~~
  - BE queries
  - FE display

### Completed

- ~~User Create (Agent Created User)~~
- ~~User Ticket Dashboard~~
- ~~Search Tickets~~
- ~~Add Ticket fields~~
  - ~~Priority~~
  - ~~Solved Status Type~~
- ~~BreadCrumbs~~
- ~~Ticket page Customer / Agent~~
- ~~Status chip for ticket table~~
- ~~Protect ticket graphlql q/m~~
- ~~Fix Customer Bulk Ticket Update~~
- ~~Fix Padding in Arrow in Status Selection List~~
- ~~handle error~~
  - ~~bad id caste error~~
    - ~~user~~
    - ~~company~~
    - ~~profile~~
    - ~~ticket~~
- ~~format mongo dup errors on server~~
- ~~forgot password/reset password~~
  - ~~request reset on FE~~
  - ~~send token to email in link on BE~~
  - ~~send token from fe with updated password~~
  - ~~verify token and update password~~
- ~~Organize Schema Type File~~
- ~~unassigned Tickets~~
- ~~Group tickets~~
- ~~Add User Company Model~~
  - ~~CRUD~~
- ~~Delete Tickets~~
  - ~~Single Ticket~~
  - ~~Bulk Delete~~
- ~~ingest email tickets?~~
  - ~~ingest new email tickets~~
  - ~~allow for ticket code in subject comment on ticket~~
- ~~Send email on ticket update to requester~~
  - ~~allow for user to reply to the email~~
    - ~~ingest only the user's reply (reply above line or something)~~
- ~~Merge Tickets~~
- ~~BLOG Posts~~
  - ~~Public site display blog posts~~
  - ~~CRUD Blog Posts~~
    - ~~FE~~
    - ~~BE~~
- ~~Dashboard Open Context?~~
- ~~Ticket Create/Update history~~
  - ~~BE (for agents only)~~
  - ~~FE (for agents only)~~
  - ~~ability to change public comments to internal~~
    - ~~FE~~
    - ~~BE~~
- ~~Close Tickets~~
  - ~~Run Scheduler to close solved tickets after x days~~
  - ~~Lock closed tickets from being updated~~
    - ~~BE~~
    - ~~FE~~
