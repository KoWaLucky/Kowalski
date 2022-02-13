const moment = require("moment");
          const card1 = (filtredEmployees) => {
            return{
                "type": "AdaptiveCard",
                
                "body": filtredEmployees.map(item =>{
                  return{
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": `${item.field_1} - ${moment(item.field_4).format("DD.MM.YYYY")} `
                  }
                }),
              
                "actions": [
                  {
                    "type": "Action.Execute",
                    "title": "На главную",
                    "verb": "hello",
                    "fallback": "Action.Submit"
                  },              
                ],
              
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
              
                "version": "1.4"
              
              }
            
          }
      module.exports.cards = {
        card1: card1
  }