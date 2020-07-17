
(function init() {
    var $ = go.GraphObject.make;

    var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
        "undoManager.isEnabled": true,
        layout: $(go.TreeLayout,
                    { angle: 90, layerSpacing: 35 })
        });

    // the template we defined earlier
    myDiagram.nodeTemplate =
    $(go.Node, "Horizontal",
        { background: "lightgrey" },
        $(go.TextBlock, "Option 1",
        { margin: 12, stroke: "blue", font: "16px sans-serif" },
        new go.Binding("text", "option1")),
        $(go.TextBlock, "Option 2",
        { margin: 12, stroke: "red", font: "16px sans-serif" },
        new go.Binding("text", "option2")),

    );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
    $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, // the link's path shape
        { strokeWidth: 3, stroke: "#555" }));

    var model = $(go.TreeModel);
    // model.nodeDataArray =
    // [
    // { key: "1",              option1: "Q 1",   option2: "Q 2" },
    // { key: "2", parent: "1", option1: "Q 3",   option2: "Q 4" },
    // { key: "3", parent: "1", option1: "Q 3.1",   option2: "Q 4.1" },
    // { key: "4", parent: "3", option1: "Q 5",   option2: "Q 6" },
    // { key: "5", parent: "3", option1: "Q 7",   option2: "Q 8" },
    // { key: "6", parent: "2", option1: "Q 3.2",   option2: "Q 4.2" }
    // ];
    var dataset = {'Taste':['Salty','Spicy','Spicy','Spicy','Spicy','Sweet','Salty','Sweet','Spicy','Salty'],
           'Temperature':['Hot','Hot','Hot','Cold','Hot','Cold','Cold','Hot','Cold','Hot'],
           'Texture':['Soft','Soft','Hard','Hard','Hard','Soft','Soft','Soft','Soft','Hard'],
           'Eat':['No','No','Yes','No','Yes','Yes','No','Yes','Yes','Yes']};

    const df = new DataFrame(dataset, ['Taste','Temperature','Texture','Eat']);
    model.nodeDataArray = formatTree(fit(df, 'Eat'));
    // model.nodeDataArray = [
    //     { key: "1",              option1: "Q 1",   option2: "Q 2", option3: "asdf" },
    //     { key: "2", parent: "1", option1: "Q 3",   option2: "Q 4" },
    //     { key: "3", parent: "1", option1: "Q 3.1",   option2: "Q 4.1" },
    //     { key: "4", parent: "1", option1: "Q 3.1",   option2: "Q 4.1" },
    // ]
    myDiagram.model = model;

})()
