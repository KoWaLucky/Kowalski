
const { TeamsActivityHandler, CardFactory, TurnContext } = require("botbuilder");
const rawWelcomeCard = require("./adaptiveCards/hello.json");
const rawWelcomeCard1 = require("./adaptiveCards/aboutWork.json");
const rawWelcome2 = require("./adaptiveCards/vacation.json");
const rawWelcome3 = require("./adaptiveCards/workPlace.json");
const rawWelcome4 = require("./adaptiveCards/staff.json");
const rawWelcome5 = require("./adaptiveCards/recruitment.json");
const rawWelcome6 = require("./adaptiveCards/ctc.json");
const rawWelcome7 = require("./adaptiveCards/telephone.json");
const rawWelcome8 = require("./adaptiveCards/adress.json");
const rawWelcome9 = require("./adaptiveCards/weekend.json");
const rawWel10 = require("./adaptiveCards/logos.json");
const rawWel11 = require("./adaptiveCards/vmi.json");
const rawWel12 = require("./adaptiveCards/training.json");
const rawWel13 = require("./adaptiveCards/assignment.json");
const rawWel14 = require("./adaptiveCards/hospital.json");
const rawWel15 = require("./adaptiveCards/probation.json");
const rawWel16 = require("./adaptiveCards/documetns.json");
const rawWel17 = require("./adaptiveCards/include.json");
const rawWel18 = require("./adaptiveCards/time.json");
const rawWel19 = require("./adaptiveCards/work.json");
const rawWel20 = require("./adaptiveCards/condition.json");
const rawWel21 = require("./adaptiveCards/dinner.json");
const rawWel22 = require("./adaptiveCards/recycling.json");
const raw23 = require("./adaptiveCards/holiday.json");
const raw24 = require("./adaptiveCards/statement.json");
const raw25 = require("./adaptiveCards/duration.json");
const raw26 = require("./adaptiveCards/record.json");
const raw27 = require("./adaptiveCards/contact.json");
const raw28 = require("./adaptiveCards/pc.json");
const raw29 = require("./adaptiveCards/master.json");
const raw30 = require("./adaptiveCards/screen.json");
const raw31 = require("./adaptiveCards/help.json");
const raw32 = require("./adaptiveCards/pass.json");
const raw33 = require("./adaptiveCards/quantity.json");
const raw34 = require("./adaptiveCards/satisfy.json");
const raw35 = require("./adaptiveCards/information.json");
const raw36 = require("./adaptiveCards/guide.json");
const raw37 = require("./adaptiveCards/raising.json");
const raw38 = require("./adaptiveCards/mission.json");
const raw39 = require("./adaptiveCards/closes.json");
const raw40 = require("./adaptiveCards/direct.json");
const raw41 = require("./adaptiveCards/term.json");
const raw42 = require("./adaptiveCards/transfer.json");
const raw43 = require("./adaptiveCards/cancelled.json");
const raw44 = require("./adaptiveCards/dms.json");
const raw45 = require("./adaptiveCards/mds.json");
const raw46 = require("./adaptiveCards/doctor.json");
const raw47 = require("./adaptiveCards/medical.json");
const raw48 = require("./adaptiveCards/act.json");
const r49 = require("./adaptiveCards/structure.json");
const r50 = require("./adaptiveCards/axapta.json");
const r51 = require("./adaptiveCards/qlic.json");
const r52 = require("./adaptiveCards/tutorial.json");
const r53 = require("./adaptiveCards/przd.json");
const r54 = require("./adaptiveCards/trng.json");
const r55 = require("./adaptiveCards/trng1.json");
const r56 = require("./adaptiveCards/trng2.json");
const r57 = require("./adaptiveCards/pcwork.json");
const r58 = require("./adaptiveCards/otp.json");
const r59 = require("./adaptiveCards/pto.json");
const r60 = require("./adaptiveCards/gsz.json");
const r61 = require("./adaptiveCards/bdata.json");
const cardTools = require("@microsoft/adaptivecards-tools");
const { default: axios } = require("axios");
const moment = require("moment");
const { AttachmentPrompt } = require("botbuilder-dialogs");
const {cards} = require("./adaptiveCards/cards");
const { get } = require("request");
var FormData = require('form-data');

let token = 'test1';

let myCard = {
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "size": "Medium",
      "weight": "Bolder",
      "text": "Приветствую, какой вопрос вас интересует?"
    },
    {
      "type": "TextBlock",
      "text": "Выберите категорию, которая вас интересует.",
      "wrap": true
    }
  ],

  "actions": [
    {
      "type": "Action.Execute",
      "title": "О работе",
      "verb": "event",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Отпуск",
      "verb": "event2",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Рабочее место",
      "verb": "event3",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Сотрудники",
      "verb": "event4",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Дни рождения",
      "verb": "event5",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "СТС",
      "verb": "event6",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Доступы",
      "verb": "logos",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "ДМС",
      "verb": "vmi",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Обучение",
      "verb": "training",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Командировка",
      "verb": "assignment",
      "fallback": "Action.Submit"
    },
    {
      "type": "Action.Execute",
      "title": "Больничный",
      "verb": "hospital",
      "fallback": "Action.Submit"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.4"
}



class TeamsBot extends TeamsActivityHandler {
  expires_on = new Date();

  httpClient;

  constructor() {
    super();

    this.httpClient = axios.create();

    // record the likeCount
    this.likeCountObj = { likeCount: 0 };
    this.actionsMyCard = [
      {
        "type": "Action.Execute",
        "title": "О работе",
        "verb": "event",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Отпуск",
        "verb": "event2",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Рабочее место",
        "verb": "event3",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Сотрудники",
        "verb": "event4",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Дни рождения",
        "verb": "event5",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "СТС",
        "verb": "event6",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Доступы",
        "verb": "logos",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "ДМС",
        "verb": "vmi",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Обучение",
        "verb": "training",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Командировка",
        "verb": "assignment",
        "fallback": "Action.Submit"
      },
      {
        "type": "Action.Execute",
        "title": "Больничный",
        "verb": "hospital",
        "fallback": "Action.Submit"
      },
    ],
      this.onMessage(async (context, next) => {
        console.log("Running with Message Activity.");
        let txt = context.activity.text;
        const removedMentionText = TurnContext.removeRecipientMention(
          context.activity
        );
        if (removedMentionText) {
          // Remove the line break
          txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
        }
        // Trigger command by IM text
        switch (txt) {
          case "hello": {
            let tmp = this.transformArray(myCard.actions);
            tmp.map(async item => {
              myCard.actions = item;
              const card = cardTools.AdaptiveCards.declare(myCard).render();
              await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
            });
            myCard.actions = this.actionsMyCard;
          }
        }
        // By calling next() you ensure that the next BotHandler is run.
        await next();
      });
    console.log('member add')
    // Listen to MembersAdded event, view https://docs.microsoft.com/en-us/microsoftteams/platform/resources/bot-v3/bots-notifications for more events
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          const card = CardFactory.adaptiveCard(myCard);
          await context.sendActivity({ attachments: [card] });
        }
      }
      await next();
    });
    
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://login.microsoftonline.com/7ce83bea-9f48-4720-966f-6abbbe073228/tokens/OAuth/2/',
      'headers': {
        'content-Type': 'application/json;odata=verbose',
        'Accept': 'application/json;odata=verbose',
        'Cookie': 'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrV61aeeyiugvni0yrX3VYv03BQVJmSseymtBz8pK9HZLh4JPxLzFTxz6B69owUYvvggovwO0yLsvRm0mG_q9YWD0Zj9WzU4n78RHBcHI2HsVlVYql3QTasI917YQYZGbuH7QG5fkDn-lNnzwpLRTzLp3XLTAISxe6KKbGyGzq_sMgAA; fpc=Am8Cv2ImObVOkHgSJGOs4pQ2PmRsAQAAANPjltkOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd'
      },
      formData: {
        'grant_type': 'client_credentials',
        'client_id': 'dba3e4a8-a668-4dc1-8d93-c5485026e6b4@7ce83bea-9f48-4720-966f-6abbbe073228',
        'client_secret': 'iEoy21r5xOkquf7voUYfvRSlEpe05NEcfIhrIyKHigw=',
        'resource': '00000003-0000-0ff1-ce00-000000000000/365sts.sharepoint.com@7ce83bea-9f48-4720-966f-6abbbe073228'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      token = JSON.parse(response.body).access_token;
      console.log(token);
    });
  
      
}

  transformArray(array) {
    let size = 6;
    let subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      subarray[i] = array.slice((i * size), (i * size) + size);
    }
    return subarray;
  }


  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(context, invokeValue) {
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    
  //   {
  //     "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
  //     "manifestVersion": "1.11",
  //     "version": "1.0.0",
  //     "id": "7f5bcf95-f7a3-4d90-853b-4f893305c3fa",
  //     "packageName": "http://smart-ts.ru/",
  //     "developer": {
  //         "name": "Smart Team Service LCC",
  //         "websiteUrl": "http://smart-ts.ru/",
  //         "privacyUrl": "https://www.example.com/index.html#/privacy",
  //         "termsOfUseUrl": "https://www.example.com/index.html#/termsofuse"
  //     },
  //     "icons": {
  //         "color": "resources/color.png",
  //         "outline": "resources/outline.png"
  //     },
  //     "name": {
  //         "short": "hop",
  //         "full": "smart-ts hop"
  //     },
  //     "description": {
  //         "short": "All information is written below",
  //         "full": "Look down"
  //     },
  //     "accentColor": "#FFFFFF",
  //     "bots": [
  //         {
  //             "botId": "bf11fc6e-ee6e-4364-b1f1-54ba8fb26189",
  //             "scopes": [
  //                 "personal",
  //                 "team",
  //                 "groupchat"
  //             ],
  //             "supportsFiles": false,
  //             "isNotificationOnly": false,
  //             "commandLists": [
  //                 {
  //                     "scopes": [
  //                         "personal",
  //                         "team",
  //                         "groupchat"
  //                     ],
  //                     "commands": [
  //                         {
  //                             "title": "hello",
  //                             "description": "Resend welcome card of this Bot"
  //                         }
  //                     ]
  //                 }
  //             ]
  //         }
  //     ],
  //     "composeExtensions": [],
  //     "configurableTabs": [],
  //     "staticTabs": [],
  //     "permissions": [
  //         "identity",
  //         "messageTeamMembers"
  //     ],
  //     "validDomains": [
  //         "hopdev4c43babot.azurewebsites.net"
  //     ],
  //     "webApplicationInfo": {
  //         "id": "f41c6003-c2ef-47d8-a333-94525a5ae935",
  //         "resource": "api://botid-bf11fc6e-ee6e-4364-b1f1-54ba8fb26189"
  //     }
  // }

var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://login.microsoftonline.com/7ce83bea-9f48-4720-966f-6abbbe073228/tokens/OAuth/2/',
      'headers': {
        'content-Type': 'application/json;odata=verbose',
        'Accept': 'application/json;odata=verbose',
        'Cookie': 'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrV61aeeyiugvni0yrX3VYv03BQVJmSseymtBz8pK9HZLh4JPxLzFTxz6B69owUYvvggovwO0yLsvRm0mG_q9YWD0Zj9WzU4n78RHBcHI2HsVlVYql3QTasI917YQYZGbuH7QG5fkDn-lNnzwpLRTzLp3XLTAISxe6KKbGyGzq_sMgAA; fpc=Am8Cv2ImObVOkHgSJGOs4pQ2PmRsAQAAANPjltkOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd'
      },
      formData: {
        'grant_type': 'client_credentials',
        'client_id': 'dba3e4a8-a668-4dc1-8d93-c5485026e6b4@7ce83bea-9f48-4720-966f-6abbbe073228',
        'client_secret': 'iEoy21r5xOkquf7voUYfvRSlEpe05NEcfIhrIyKHigw=',
        'resource': '00000003-0000-0ff1-ce00-000000000000/365sts.sharepoint.com@7ce83bea-9f48-4720-966f-6abbbe073228'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      token = JSON.parse(response.body).access_token;
      console.log(token);
    });
  

    let array = [1, 2, 3, 4, 5, 6, 7, 8];
    let size = 4;
    let subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      subarray[i] = array.slice((i * size), (i * size) + size);
    }
    // const axios = require('axios').default;
   
    if (invokeValue.action.verb === "event") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcomeCard1).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };

    }
    if (invokeValue.action.verb === "event2") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome2).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };


    }
    if (invokeValue.action.verb === "event3") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome3).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "event4") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome4).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    
    }
    if (invokeValue.action.verb === "event5")
    {

      console.log("token" + token);

      axios.get("https://365sts.sharepoint.com/sites/ManageSTS/_api/Web/Lists(guid'd8d7d5ad-1d07-45c6-82f4-8e54c7da6b2d')/Items", {
        headers: {
          'Authorization': 'bearer ' + token,
        },
        
      })  
      .then(async(res) => {
          try {
            let today = new Date();
            const users = res.data.value.filter(item => moment(item.field_4).format('MM') === moment(today).format('MM'));
            // console.log(users);
            // const card = cards.card1(users);
            const card = await cardTools.AdaptiveCards.declareWithoutData(cards.card1(users)).render();
            await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)]});
            return { statusCode: 200 };
          }catch(error){
            return { statusCode: 200 };
          } 
      })
  

    }
    
    if (invokeValue.action.verb === "event6") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome6).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }

    if (invokeValue.action.verb === "telephone") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome7).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "adress") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome8).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    } if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "weekend") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcome9).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    } if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }

    if (invokeValue.action.verb === "logos") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel10).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "vmi") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel11).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "training") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel12).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "assignment") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel13).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };

    }
    if (invokeValue.action.verb === "hospital") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel14).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "probation") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel15).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "documetns") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel16).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "include") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel17).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "time") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel18).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "work") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel19).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "condition") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel20).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "dinner") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel21).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "recycling") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawWel22).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "holiday") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw23).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "statement") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw24).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "duration") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw25).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "record") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw26).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "contact") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw27).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "pc") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw28).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "master") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw29).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "screen") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw30).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "help") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw31).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "pass") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw32).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "quantity") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw33).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "satisfy") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw34).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "information") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw35).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "guide") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw36).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "raising") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw37).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "mission") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw38).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "closes") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw39).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "direct") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw40).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "term") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw41).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "transfer") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw42).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "cancelled") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw43).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "dms") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw44).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "mds") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw45).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "doctor") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw46).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "medical") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw47).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "act") {
      const card = cardTools.AdaptiveCards.declareWithoutData(raw48).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "structure") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r49).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });

      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "axapta") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r50).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "qlic") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r51).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "tutorial") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r52).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "przd") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r53).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "trng") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r54).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "trng1") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r55).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "trng2") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r56).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "pcwork") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r57).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "otp") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r58).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "pto") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r59).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "gsz") {
      const card = cardTools.AdaptiveCards.declareWithoutData(r60).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      return { statusCode: 200 };
    }
    if (invokeValue.action.verb === "hello") {
      let tmp = this.transformArray(myCard.actions);
      tmp.map(async item => {
        myCard.actions = item;
        const card = cardTools.AdaptiveCards.declare(myCard).render();
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      });
      myCard.actions = this.actionsMyCard;

      return { statusCode: 200 };
    }


  }
}


module.exports.TeamsBot = TeamsBot;
