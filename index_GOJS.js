
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

    var dataset = {'Taste':['Salty','Spicy','Spicy','Spicy','Spicy','Sweet','Salty','Sweet','Spicy','Salty'],
           'Temperature':['Hot','Hot','Hot','Cold','Hot','Cold','Cold','Hot','Cold','Hot'],
           'Texture':['Soft','Soft','Hard','Hard','Hard','Soft','Soft','Soft','Soft','Hard'],
           'Eat':['No','No','Yes','No','Yes','Yes','No','Yes','Yes','Yes']};

    const df = new DataFrame(dataset, ['Taste','Temperature','Texture','Eat']);

    var dataset2 = []
    for (var i = 1; i < DATA.length; i++)
        dataset2.push(DATA[i]);
    const df2 = new DataFrame(dataset2, DATA[0]);
    model.nodeDataArray = formatTree(fit(df, 'Eat'));
    //model.nodeDataArray = formatTree(fit(df2, 'Outcome'));
    //myDiagram.model = model;
})()
