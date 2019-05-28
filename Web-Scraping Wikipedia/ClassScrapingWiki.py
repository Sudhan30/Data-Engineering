#Importing Libraries
import numpy as np
import pandas as pd
import requests
from bs4 import BeautifulSoup
import re

#Class for Web Scraping
class Scraping:

    #Function to Extract tables associated with a given Wikipedia Table
    def Extract_Table(self,extract_tag):
        header= [[th.text.strip() for th in tr.find_all('th')] for tr in extract_tag.find_all('tr')[:1]]
        all_data= [[td.text.strip() for td in tr.find_all('td')] for tr in extract_tag.find_all('tr')[1:]]
        all_data=pd.DataFrame(all_data)
        #Customization for steps for this table header(This is because each column contains area in both Sq.mi & sq.km)(Next 2 Steps)
        header[0].insert(7,'2016 land area (Sq.Km)')
        header[0].insert(9,'population density (per Sq.Km)')
        all_data.columns=header
        return all_data

    #Function that extracts the page links of the Top Cities
    def Extract_Links(self, extract_tag):
        Link_temp_extract= [[a.get('href') for a in tr.find_all('a') for td in tr.find_all('td')] for tr in extract_tag.find_all('tr')[1:]]
        Link_temp_extract=pd.DataFrame(Link_temp_extract)
        Link_temp_extract[0]='https://en.wikipedia.org'+Link_temp_extract[0] #Appending Wiki Link to the relative Page Link
        top_city_pages=list(Link_temp_extract[0]) # Melting Pandas DataFrame into Links of WikiPages
        return top_city_pages

    #Function that scoops the InfoBox information of a given city

    def CityPageScrap(self,link_city):
        city_soup_sub=BeautifulSoup(requests.get(link_city).text,'lxml')
        infobox=city_soup_sub.find('table',{'class':'infobox geography vcard'})

        if infobox is not None:
            key_lst=[]
            value_lst=[]
            for tr in infobox.find_all('tr'):
                key='N/A'
                value='N/A'
                for th in tr.find_all('th'):
                    key=th.text.strip()
                for td in tr.find_all('td'):
                    value=td.text.strip()
                key_lst.append(key)
                value_lst.append(value)

            info_table=pd.DataFrame(list(zip(key_lst,value_lst)),columns =['Attributes', 'Values'])
            #Cleaning the Newly Created Database (by removing Wikipedia HyperLink References)
            info_table['Attributes'] = info_table['Attributes'].replace('(\[.*?\])','', regex=True)
            info_table['Values'] = info_table['Values'].replace('(\[.*?\])','', regex=True)
            info_table['Attributes'] = info_table['Attributes'].replace('[^0-9a-zA-Z/ )(]+','', regex=True) #Cleaning Special Chars
            info_table['Attributes'] = info_table['Attributes'].replace('\([^)]*\)','', regex=True)
            info_table=info_table[(info_table['Attributes']!='N/A') & (info_table['Values']!='N/A')] #Filtering Non None Row Values
            info_table=info_table.append({'Attributes':'CityName', 'Values':city_soup_sub.find('h1').text}, ignore_index=True)
            info_table=info_table.set_index('Attributes')
            info_table.index.names = [None]
            info_table=info_table.transpose()
            info_table=info_table.reset_index()
            info_table=info_table.drop(['index'],axis=1)
            info_table=info_table.loc[:, ~info_table.columns.duplicated()]
        else:
            info_table=None
        return info_table
