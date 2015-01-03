import json
import pandas as pd
from sqlalchemy import create_engine, MetaData, Table


rating_header = ['id', 'itemTime', '1', '2', '3', '4', 'correct', 'type', 'sentence']

db_url = 'sqlite:///participants.db'
table_name = 'implicatures'
data_column_name = 'datastring'

# boilerplace sqlalchemy setup
engine = create_engine(db_url)
metadata = MetaData()
metadata.bind = engine
table = Table(table_name, metadata, autoload=True)

# make a query and loop through
s = table.select()
rows = s.execute()

data = []
#status codes of subjects who completed experiment
statuses = [3,4,5,7]
# if you have workers you wish to exclude, add them here
exclude = []
for row in rows:
    # only use subjects who completed experiment and aren't excluded
    if row['status'] in statuses and row['uniqueid'] not in exclude:
        data.append(row[data_column_name])

# Now we have all participant datastrings in a list.
# Let's make it a bit easier to work with:

# parse each participant's datastring as json object
# and take the 'data' sub-object
data = [json.loads(part)['data'] for part in data]


# insert a few things into the data array
def insert(data):
    tdata = []
    for part in data:
        for record in part:
            trialdata = record['trialdata']
            if len(trialdata) == 1:
                language = trialdata[0]
                #[record.insert(3, language) for record in tdata]
                continue
            try:
                trialdata.insert(0, record['dateTime'])
                trialdata.insert(0, record['uniqueid'])
                tdata.append(trialdata)
            except AttributeError:
                continue 
    return tdata

data = insert(data)

# Put all subjects' trial data into a dataframe object from the
# 'pandas' python library: one option among many for analysis
data_frame = pd.DataFrame(data)
data_frame.to_csv('data.csv', header = rating_header, index = False)
