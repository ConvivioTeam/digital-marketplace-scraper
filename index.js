require('dotenv').config()
const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const prefixURL = 'https://www.digitalmarketplace.service.gov.uk/digital-outcomes-and-specialists/opportunities/';

app.use(helmet({ 
  dnsPrefetchControl: { allow: true }
}));

app.get('/opp/:oppID', async function (req, res) {
  const oppID = req.params.oppID.toString();
  if(oppID) {
    try {
      const oppData = await getOppData({id: oppID});
      res.send(oppData);
    } catch(err) {
      // return res.sendStatus(400).json({
      //   error: err
      // })
    }
  } else {
    return res.sendStatus(400).json({
      error: 'Missing id'
    })
  }
});

const getOppData = function(options) {
return new Promise(
  function (resolve, reject) {
    const url = prefixURL + options.id;  
    rp(url)
      .then(function (html) {
        const $ = cheerio.load(html);
        let data = {};
        data.title = $('h1').text();
        data.buyer = $('.page-heading-smaller .context').text().replace(/\n/g, '').trim();
        data.published_date = getRowContents($, 'Published');
        data.questions_deadline = getRowContents($, 'Deadline for asking questions');
        data.application_deadline = getRowContents($, 'Closing date for applications');
        data.budget_range = getRowContents($, 'Budget range');
        data.location = getRowContents($, 'Location');
        data.latest_start_date = getRowContents($, 'Latest start date');
        let skills = [];
        const $table = $( "table:contains('Skills and experience')");
        const $rows = $table.find('.summary-item-row');
        // A single item is not output as a list.
        $rows.each(function( index ) {
          const $row = $(this);
          const $listItems = $row.find('li');
          if ($listItems.length) {
            $listItems.each(function( index ) {
              const $listItem = $(this)
              skills.push($listItem.text());
            });
          } else {
            const $fieldContent = $row.find('.summary-item-field');
            skills.push($fieldContent.text().trim())
          }
        });
        data.skills = skills;
        resolve(data);
      })
      .catch(function (err) {
        console.error(err);
        reject(err); // reject
      });
  }
);
};

const getRowContents = function($,rowTitle) {
  return $( ".summary-item-row:contains('"+ rowTitle + "')" ).find('.summary-item-field').text().replace(/\n/g, '').trim();
}

app.listen(port, (err) => {
  console.log('Listening on', port);
  if (err) {
      throw err;
  }
});