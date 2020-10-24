# Front-end kata

Kata is a Japanese word (型 or 形) meaning literally "form" referring to a detailed choreographed pattern of martial arts movements made to be practiced. Is also commonly used to when practicing repeating something, in this case, development.

## Usage

Project scaffolding using react-create-app (for some reason I was having an error when trying to execute webpack-dev-server so I switched) and is by default configured to run with the following command

```bash
npm start
```
It'll start a server in port 3000 and will launch a tab or window of your default browser.

## Explanation

### Login page
Application will show a login screen, you can enter whatever values you want but make sure of the following
* username is at least 8 chars long
* password is at least 8 chars long, 1 capital letter, 1 special symbol `(!$@"%&/)`, max 20 chars

### Home page
After submitting will load home page with some options in the nav bar where you will be able to visualize data (pie chart doesn't show relevant data, is just dummy)

### Transfer page

This page has a form to submit new transactions, will show a pie chart with the current transactions grouped by destination account (this one works but doesn't show labels, didn't research further) and will load transactions from mock service and display them below, separated in tables by Origin account.

#### Disclaimer

Exercise is not complete, I used the opportunity mostly to refresh my knowledge on the library. It has a lot of opportunity areas but I still wanted to share it. I felt time wasn't enough to do what I wanted to do and I am nowhere happy with the result but I didn't want to take more time on this. 

## 3rd party libraries
* react-minimal-pie-chart - For the pie chart
* miragejs - to mock api requests

## License
[MIT](https://choosealicense.com/licenses/mit/)