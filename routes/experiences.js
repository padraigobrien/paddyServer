var experiences = [
    {id:0 , title:"Walking tour of the metals", guide:"Cian O'Cuilleanain", duration :"120", description: "be amazed at the beutiful walking trail of the metals", image: 'theMetals.jpg'},
    {id:1 , title:"Tour of the DLR Lexicon", guide:"Padraig OBrien", duration:"30", description: "While this  building has been polarising to the local community it has to be experienced." , image :'theLibrary.jpg'},
    {id:2 , title:"The west pier", guide:"Niall O'Cuilleanain", duration:"120", description: "Lose yourself in this lovely walk, wear a big cote in the winter though", image : 'theWestpier.jpg'}
];

exports.findAll = function (req, res, next) {
    res.send(experiences);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(experiences[id]);
};