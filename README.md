Plutus


API Endpoints

/auth/
    POST:
    /create
    /login
    /delete
    /update

/expenses/
    GET:
    /all?user=<email>
    /bydaterange?user=<email>&startDate=<datestring>&endDate=<datestring>
    /bytype?user=<email>&types=<comma-separated string list>
    /bytype_daterange?user=<email>&types=<comma-separated string list>&startDate=<datestring>&endDate=<datestring>
    /byamount?user=<email>&amountLowerBound=<number>&amountUpperBound=<number>
    /byamount_daterange?user=<email>&amountLowerBound=<number>&amountUpperBound=<number>?startDate=<datestring>&endDate=<datestring>

/incomes/


/limits/

