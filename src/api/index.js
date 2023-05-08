const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/homes', async (req, res) => {
  const { city, checkin, checkout } = req.query; 
  const url = `https://www.airbnb.com/s/${city}/homes?&checkin=${checkin}&checkout=${checkout}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    timeout: 60000,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const homes = await page.$$eval('.c1l1h97y.dir.dir-ltr', homes => {
    return homes.map(home => {
      let img = 'https://a0.muscache.com/im/pictures/fe88e5f9-688d-4b7c-882a-ebfed6db4874.jpg?im_w=120&im_q=lowq';
      const imgE1 = home.querySelector('.dir.dir-ltr');
      if (imgE1) {
        const imgE2 = imgE1.querySelector('img');
        if (imgE2) {
            img = imgE2.getAttribute('src');
        }
      }
      const titleEl = home.querySelector('.t1jojoys.dir.dir-ltr');
      const title = titleEl ? titleEl.innerText : 'Unknown';

      const descriptionEl = home.querySelector('.t6mzqp7 dir dir-ltr');
      const description = descriptionEl ? descriptionEl.innerHTML : 'No Description';

      const priceEl = home.querySelector('._tyxjp1');
      const priceRaw = priceEl ? priceEl.innerHTML : 'Price unavailable';
      const price = priceRaw.replace(/&nbsp;/g,'');

      let link = '#';
      const linkEl_1 = home.querySelector('.cy5jw6o.dir.dir-ltr');
      if (linkEl_1) {
        const linkEl_2 = linkEl_1.querySelector('a');
        if (linkEl_2) {
          link = linkEl_2.getAttribute('href');
        }
      }
      link = 'http://www.airbnb.com/'+link;

      return { img, title, description, price, link };
    });
  });

  await browser.close();

  res.json(homes);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));