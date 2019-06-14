1. Which user had the maximum number of visits and when?

db.TestData.aggregate([
    {$group: {_id: {fullVisitorId: "$fullVisitorId", date:"$date"}, total:{$sum:"$visits"}}},
    {$sort: {total: -1}},
    {$limit:1}
],
{allowDiskUse:true})

2. Is a blackberry user less likely to visit the store than iOS user?

db.TestData.aggregate([
  {$match:{operatingSystem: {$in: ["BlackBerry","iOS"]}}},
  {$group:{_id: "$operatingSystem",CountOS:{$sum:1}}},
  {$sort: {CountOS: -1}}
])

3. Which date had the most number of iOS users from Belgium?

db.TestData.aggregate([
  {$match: {$and: [{operatingSystem:"iOS"},{country:"Belgium"}]}},
  {$group:{_id:{operatingSystem:"$operatingSystem",country:"$country",date:"$date"},Count:{$sum:1}}},
  {$sort: {Count: -1}},
  {$limit:1}
])

4. Were more mobile devices (than non-mobile devices) used to visit the store?

db.TestData.aggregate([
  {$group:{_id:{ismobile:"$isMobile"},Count:{$sum:1}}},
  {$sort: {Count: -1}}
])

5. Provide a breakdown of store pageviews by city

db.TestData.aggregate([
  {$match:{city:{$nin:["not available in demo dataset","(not set)"]}}},
  {$group:{_id:{city:"$city"},pageviewcount:{$sum:"$pageviews"}}},
  {$sort: {pageviewcount: -1}},
])

6. How many users used only Windows devices to visit the store?

db.TestData.aggregate([
  {$match:{operatingSystem:"Windows"}},
  {$group:{_id:{operatingSystem:"$operatingSystem"},Count:{$sum:1},total:{$sum:"$fullVisitorId"}}}
])

db.TestData.aggregate([
  {$match:{operatingSystem:"Windows"}},
  {$group:{_id:{operatingSystem:"$operatingSystem"},Count:{$sum:1}}}
])

7. How many visitors had zero pageviews?

db.TestData.aggregate([
  {$match:{pageviews:0}},
  {$group:{_id:{visitId:"$visitId",pageviews:"$pageviews"},Count:{$sum:1}}},
  {$sort: {Count: 1}},
  {$out:"SampleOut"}
],
{allowDiskUse:true})


db.SampleOut.find().count()

8.Which city (other than unknown) had the most number of desktop users?

db.TestData.aggregate([
  {$match: {$and: [{city:{$nin:["not available in demo dataset","(not set)"]}},{deviceCategory:"desktop"}]}},
  {$group:{_id:{deviceCategory:"$deviceCategory",city:"$city"},Count:{$sum:1}}},
  {$sort: {Count: -1}},
  {$limit:1}
])


#######################################################################################################################################
2. Is a Windows user more likely to visit the store than Macintosh user?

db.TestData.aggregate([
  {$match:{operatingSystem: {$in: ["Windows","iOS"]}}},
  {$group:{_id: "$operatingSystem",CountOS:{$sum:1}}},
  {$sort: {CountOS: -1}}
])

3. Which date had the least and most number of visitors with non-mobile devices?

db.TestData.aggregate([
  {$match:{isMobile:"FALSE"}},
  {$group:{_id:{date:"$date",isMobile:"$isMobile"},Count:{$sum:1}}},
  {$sort: {Count: 1}},
  {$limit:1}
],
{allowDiskUse:true})

db.TestData.aggregate([
  {$match:{isMobile:"FALSE"}},
  {$group:{_id:{date:"$date",isMobile:"$isMobile"},Count:{$sum:1}}},
  {$sort: {Count: -1}},
  {$limit:1}
],
{allowDiskUse:true})

4. Were mobile devices users more socially engaged than non-mobile device users?

db.TestData.aggregate([
  {$group:{_id:{socialEngagementType:"$socialEngagementType"},Count:{$sum:1}}},
  {$sort: {Count: -1}}
])


db.TestData.aggregate([
  {$group:{_id:{ismobile:"$isMobile",socialEngagementType:"$socialEngagementType"},Count:{$sum:1}}},
  {$sort: {Count: -1}}
])

5. Provide a breakdown of store hits by region

db.TestData.aggregate([
  {$match:{region:{$nin:["not available in demo dataset","(not set)"]}}},
  {$group:{_id:{region:"$region"},hits:{$sum:"$hits"}}},
  {$sort: {hits: -1}}
])

db.TestData.aggregate([
  {$match:{region:{$nin:["not available in demo dataset","(not set)"]}}},
  {$group:{_id:{region:"$region"},hits:{$sum:"$hits"}}},
  {$sort: {hits: -1}},
  {$out:"HitsPerRegion"}
])

db.HitsPerRegion.count()

6. How many users used only Macintosh devices to visit the store?

db.TestData.aggregate([
  {$match:{operatingSystem:"iOS"}},
  {$group:{_id:{operatingSystem:"$operatingSystem"},Count:{$sum:1}}}
])

7. What was the average number of hits per unique visitor?

db.TestData.distinct("visitId").length

db.TestData.aggregate([
  {$group:{_id:null,Count:{$sum:"$hits"}}}
])


8. Visitors from which country visited the store the most?

db.TestData.aggregate([
  {$group:{_id:"$country",Count:{$sum:1}}},
  {$sort: {Count: -1}},
  {$limit:1}
])
