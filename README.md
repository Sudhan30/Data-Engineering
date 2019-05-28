# Data-Engineering
## This Repository Contains Data Engineering Projects

### 1. [Web Scraping using Python - Topos Assignment](https://github.com/Sudhan30/Data-Engineering/tree/master/Web-Scraping%20Wikipedia)

This project involves extracting information of the Largest cities in the US by population from Wikipedia, along with detailed information about each city from their individual Wikipedia pages. The extracted information is then formatted and uploaded to Google BigQuery.

The three main steps involved are:
1. Data scraping
2. Data cleaning
3. Uploading to Google BigQuery

**Data Scraping**

**The data scraping has been done in 2 stages:**
1. Scraping text from City information table containing 314 cities
2. Extraction of text from information cards of each city from its Wikipedia page, using the link scraped in step 1.

**Data cleaning**

The extracted data contains a lot of junk characters and information that is data cleansed.

**Uploading to Google BigQuery**

Top US cities information table and each of the individual city page table is merged together. The final master dataset is then uploaded to Google Big Query for further insight Development.

Tools/Environment used - Python on Jupyter Notebook, Google Cloud Platform
Packages used - BeautifulSoup, Pandas, NumPy, Re, requests

