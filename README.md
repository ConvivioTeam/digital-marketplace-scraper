# Digital Marketplace Scraper

Scrapes [digital marketplace opportunities](https://www.digitalmarketplace.service.gov.uk) and returns JSON.

## How to use

As an example, let's say you want to retrieve [this page](https://www.digitalmarketplace.service.gov.uk/digital-outcomes-and-specialists/opportunities/9058) as JSON.

Visit [https://digital-marketplace-scraper.herokuapp.com/opp/9058.](https://digital-marketplace-scraper.herokuapp.com/opp/9058) The final number being the ID from the previous URL.

It returns:

```
{
  title: "Teaching job share matching discovery",
  buyer: "Department for Education",
  published_date: "Thursday 14 February 2019",
  questions_deadline: "Thursday 21 February 2019 at 11:59pm GMT",
  application_deadline: "Thursday 28 February 2019 at 11:59pm GMT",
  budget_range: "£74250 (excluding VAT)",
  location: "London",
  latest_start_date: "Monday 1 April 2019",
  skills: [
    "Recent and demonstrable experience in delivering evidence-based research to inform a user-centred design, focused on user needs, end-to-end user journeys, motivations and goals.",
    "Recent and demonstrable experience of designing and developing digital services that meet identified user needs and business objectives.",
    "Recent demonstrable experience delivering discovery agile projects according to Government Digital Standards (GDS), including GDS Service Design Manual; the Digital Service Standard Assessment; Technology Code of Practice; wider industry standards.",
    "Recent and demonstrable evidence of managing and delivering discovery and alpha projects, meeting all requirements and successfully delivering outcomes within specified timescales.",
    "Be agnostic of any particular software, enabling us to consider a range of options to meet user needs.",
    "Demonstrable evidence of working successfully with users in the school/education landscape or in similar public services contexts.",
    "Experience of successful delivery with UK public sector organisations of a similar size and scope to the DfE."
  ]
}
```
