var DATA = `
Sun,Heat,Humidity,Wind,Play,
Sunny,Hot,High,Weak,No,
Sunny,Hot,High,Strong,No,
Overcast,Hot,High,Weak,Yes,
Rain,Mild,High,Weak,Yes,
Rain,Cool,Normal,Weak,Yes,
Rain,Cool,Normal,Strong,No,
Overcast,Cool,Normal,Strong,Yes,
Sunny,Mild,High,Weak,No,
Sunny,Cool,Normal,Weak,Yes,
Rain,Mild,Normal,Weak,Yes,
Sunny,Mild,Normal,Strong,Yes,
Overcast,Mild,High,Strong,Yes,
Overcast,Hot,Normal,Weak,Yes,
Rain,Mild,High,Strong,No`;
DATA = DATA.split('\n').map((line) => line.split(','));
