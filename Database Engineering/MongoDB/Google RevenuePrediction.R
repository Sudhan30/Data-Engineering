setwd("C:/Users/sudha/Box Sync/BA with R/R Working Directory/Fall 2018")

library(data.table)
library(jsonlite)
library(tidyverse)
library(readr)

rm=(list=ls())
train_s <- read_csv('s:/test.csv')


# a <- df$device[1] %>% fromJSON(flatten = T) 
# b <- data.frame(a)
# 
# for (i in 2:nrow(df))
#   {
#   a <- df$device[i] %>% fromJSON(flatten = T) 
#   b <- rbind(b,data.frame(a))
# }
# 


json_to_columns <- function(df, column){
  column <- enquo(column)
  
  json_df <- df %>% 
    pull(!!column) %>% 
    paste(collapse = ",") %>% 
    paste("[",.,"]") %>% 
    fromJSON(flatten = TRUE)
  
  df %>% 
    select(-!!column) %>% 
    bind_cols(json_df)
}

all_data <- train_s %>% 
  json_to_columns(device) %>% 
  json_to_columns(geoNetwork) %>% 
  json_to_columns(totals) %>% 
  json_to_columns(trafficSource)

names(all_data)

fwrite(all_data,file='S:/GoogleDataExtracted.csv')
