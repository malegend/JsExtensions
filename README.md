# JsExtensions
Useful C# style javascript extension components.

## Array Extensions.
The sequence extensions, like Linq functions of C#.

Examples:
* C# codes.
``` C#

class Element
{
    public int Id{get;set;}
    public string Name{get;set;}
    public int Score {get;set;}
}

// use linq functions:
var arr = new Element[]
{ 
    new Element(){Id=5, Name="Jack", Score=5},
    new Element(){Id=6, Name="Tom", Score=8},
    new Element(){Id=7, Name="Alice", Score=8},
    new Element(){Id=8, Name="Lin", Score=9}
};

// get score>=8:
var sc=arr.Where(p=>p.Score>=8);

// order by Score:
var st=arr.OrderBy(p=>p.Score);
```

* js codes.
``` js
let arr = [];
arr.push({id:5, name:"Jack", score:5});
arr.push({id:6, name:"Tom", score:8});
arr.push({id:7, name:"Alice", score:8});
arr.push({id:8, name:"Lin", score:9});

// get score>=8:
let sc=arr.where(p=>p.Score>=8);

// order by score:
let st=arr.orderBy(p=>p.Score);
```
