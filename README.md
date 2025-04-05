# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Damian Kopp | 324944 |
| Jakob Behler | 325413 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (21st March, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

We will mainly explore two datasets that both show the amount of fish caught (in kg) in the most popular lakes of Switzerland. The datasets show the catch amount per fish species, lake, and year. One [dataset](https://opendata.swiss/fr/dataset/berufsfischerei-ertrag5) contains the amount of fish that professional fisher caught, one [dataset](https://opendata.swiss/fr/dataset/angelfischerei-ertrag6) shows the amount of fish caught by hobby fisher.
In addition to the amount of fish, the surface size of each lake is given in km2.

In terms of data cleaning, since the datasets are taken from OpenSwissData, they are very clean already and can be used rightaway. Some species have missing numbers, but those are mostly the rarer species anyways. We will thus focus on the most popular fish species in Switzerland.

A third [dataset](https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken.assetdetail.32346388.html) that could potentially be used in our project shows the data related to the production and consumption of fish in Switzerland. However, the time spanned by the data only covers the years from 2000 to 2023. Additionally, the years 2000-2006 and 2023 contain missing data.

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

During the 20th century, big amount of phosphate and other nutrients from detergents and fertilizers flowed into our lakes, causing excessive algae growth. That overpopulation of algae on the other hand led to a poverty of oxygen in the water and therefore a decline in fish populations.
Another problem is the influence of invasive species on native species.

We think that awareness about the fish populations, overfishing and destruction of habitats of certain species needs to be raised.
With our project, we try to show the users in a fun and interactive way how the fish populations in Switzerland are evolving, which species are getting endangered, and which species are dominating others. The users should get a feeling of how things change deep down in our country's waters.

Furthermore, users might learn new things about species that they have not known until now, such as which species live in which kinds of lakes.
We plan to create some kind of gamification of visualized data to make the users stay on our website and want to learn more.

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

Here can be seen some basic statistics of the amounts of caught Lake Trout beetween the years 2000 and 2021

| Lake      | mean        | std         | min    | max         |
| --------- | ----------- | ----------- | ------ | ----------- |
| Genfersee | 3277.794091 | 1102.582145 | 1682.0 | 5695.000000 |
| Neuenburgersee | 1694.772727 | 860.228703 | 509.0 | 3782.000000 |
| Bodensee | 587.968182 | 210.661279 | 296.0 | 1168.000000 |
| Vierwaldstättersee | 1175.136364 | 501.654529 | 244.0 | 2219.000000 |
| Zürichsee | 811.751818 | 422.306054 | 242.0 | 1723.000000 |
| Thunersee | 666.447359 | 806.938426 | 254.0 | 4236.141901 |
| Lago Maggiore | 659.597727 | 297.418845 | 321.0 | 1432.000000 |
| Bielersee | 21.700000 | 12.074018 | 3.0 | 46.000000 |
| Luganersee | 325.665909 | 122.451733 | 169.0 | 628.000000 |
| Brienzersee | 341.721817 | 357.306600 | 72.0 | 1831.079981 |
| Walensee | 249.095909 | 63.312938 | 141.0 | 438.000000 |
| Murtensee | 133.840909 | 86.789667 | 33.0 | 341.000000 |
| Sempachersee | 4.954545 | 10.030797 | 0.0 | 36.000000 |
| Hallwilersee | 6.306818 | 8.199859 | 0.0 | 32.000000 |

This shows that the amount varies a lot over the years for example in the Lake of Geneva (Genfersee).

For the five lakes where the biggest amount of Lake trout was caught, we can see that in the Lake of Lucerne (Vierwaldstättersee), the numbers generally increased while in the Lake of Neuchatel (Neuenburgersee), the numbers decreased over the last view years.

![image](https://github.com/user-attachments/assets/fba46232-85e1-463e-82d9-2a4a2c5326d6)


### Related work

> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

The datasets were already used by some websites and magazines, one of which is the magazine "[Petri-Heil](https://www.petri-heil.ch/)" which is very popular among fisher. They wrote an article about fish statistics up until the year 2016, which you can find [here](https://www.petri-heil.ch/index.php?cmspath=de/schweizer-fischerei-in-zahlen--723). In the article, various species' statistics are shown, especially the amount of perch, pike, and cisco caught in 2016 by professionals versus the amount caught by hobby fisher.
However, the use cases of our datasets are rare, which suggests the novelty of our project with the purpose of shedding light on the fragile ecosystems of sweet water lakes in Switzerland.

[This](https://www.aquaviva.ch/de/aktuelles/die-aussergewoehnliche-artenvielfalt-der-felchen-in-der-schweiz) website has some very interesting and good-looking plots which might help us for more specific ideas, such as a fish or lake map.

## Milestone 2 (18th April, 5pm)

**10% of the final grade**


## Milestone 3 (30th May, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

