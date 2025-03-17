
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


def createTroutFrame(df_dict, year_interval):
    # Initialize an empty DataFrame with "Lake" as the index
    df_trouts = pd.DataFrame()
    
    # Get lakes from the most recent year available
   
    lakes = df_dict['2021'][['Lake', 'Seeforelle']]
    df_trouts = lakes.set_index("Lake")  # Set "Lake" as index

    # Loop through each year and extract trout data
    for i in range(year_interval[0], year_interval[1] + 1):
        year = str(i)
        if year in df_dict:  # Ensure year exists in dictionary
            df = df_dict[year]
            df_year = df.set_index("Lake")["Seeforelle"]  # Align by "Lake"
            df_trouts[year] = df_year  # Add to dataframe

    df_trouts = df_trouts.fillna(0)
    df_trouts.reset_index(inplace = True)
    df_trouts.drop('Seeforelle', axis = 1, inplace = True)
    return df_trouts





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
                  title=f'Laketrout fishing count  in {lake_name} Over Time',
                  labels={'Year': 'Year', 'Seeforelle': 'Laketrout fishing count'},
                  markers=True)

    fig.show()