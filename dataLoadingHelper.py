
import pandas as pd
import plotly.express as px


def makeCleanedSheetDictionary(sheets_dict):
    # takes a list of excel sheets
    # pd.read_excel('data/angling.xlsx', sheet_name=None)

    cleaned_sheets = {}
    for sheet_name, df in sheets_dict.items():
        cleaned_sheets[sheet_name] = df.iloc[4:].reset_index(drop=True) 
        
        cleaned_sheets[sheet_name] = cleaned_sheets[sheet_name] .drop(cleaned_sheets[sheet_name] .index[1:3])
        cleaned_sheets[sheet_name].columns = cleaned_sheets[sheet_name].iloc[0] 
        cleaned_sheets[sheet_name] = cleaned_sheets[sheet_name][1:].reset_index(drop=True) 
        cleaned_sheets[sheet_name] = cleaned_sheets[sheet_name].drop(cleaned_sheets[sheet_name].index[0])
        cleaned_sheets[sheet_name].columns.values[0] = "Lake"
        cleaned_sheets[sheet_name].columns.values[1] = "LakeArea"
        cleaned_sheets[sheet_name] = cleaned_sheets[sheet_name] .drop(cleaned_sheets[sheet_name] .index[16:])
    return cleaned_sheets


def LakeTimeseries(df_dict, lakeName,year_interval):
    timeseries =  []
    years = []
    for i in range(year_interval[0], year_interval[1]+1):

        year = str(i)
        df = df_dict[year]

        df_lake = df[df['Lake'] == lakeName]
        value = df_lake['Seeforelle'].values[0]

        timeseries.append(value)
        years.append(i)
    
    return timeseries, years

def plot_lake_timeseries(years, timeseries, lake_name):
    df = pd.DataFrame({'Year': years, 'Seeforelle': timeseries})

    fig = px.line(df, x='Year', y='Seeforelle', 
                  title=f'Seeforelle Population in {lake_name} Over Time',
                  labels={'Year': 'Year', 'Seeforelle': 'Seeforelle Population'},
                  markers=True)

    fig.show()