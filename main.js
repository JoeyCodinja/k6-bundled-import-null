import http from 'k6/http';
import { check } from 'k6';
import cheerio from 'cheerio';

// Inclusion of another http client library to coordinate external requests
import fetch from 'cross-fetch';

export default function () {
  console.log("fetch => ", fetch);
  const res = fetch('https://loadimpact.com')
  const $ = cheerio.load(res.body);

  const title = $('head title').text();
  check(title, {
    'has correct title': () => title == 'Load Impact is now k6',
  });
  console.log(title);
}