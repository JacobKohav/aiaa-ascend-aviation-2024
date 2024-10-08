/*
 *      ATIV Solutions LLC - Copyright 2024 - Confidential
 *
 *      The following source code is property of ATIV Solutions LLC any unauthorized use
 *      is prohibited.
 *
 *      Contact support@ativsolutions.com if you have any questions regarding licensing
 *      or general availibility of this code.
 *
 *      WebInterfaceFactory - Generated interface code, DO NOT EDIT (use tools/format.php to create)
 *      ******************** DO NOT EDIT THIS FILE, AUTO GENERATED **************************
 */
class WebInterfaceFactory{
    constructor(){
    }//constructor

    static Create(name, baseurl){
        name = name.toLowerCase();
        switch(name){
        case "project":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebProjectInterface.js');
            return new EPFormatWebProjectInterface(baseurl);
            break;

        case "project":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatProjectInterface.js');
            return new EPFormatProjectInterface(baseurl);
            break;

        case "webchatinterface":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebChatInterface.js');
            return new EPFormatWebChatInterface(baseurl);
            break;

        case "ep_schedule_block":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebScheduleBlocksInterface.js');
            return new EPFormatWebScheduleBlocksInterface(baseurl);
            break;

        case "weblayoutinterface":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebLayoutInterface.js');
            return new EPFormatWebLayoutInterface(baseurl);
            break;

        case "webfilter":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebFilterInterface.js');
            return new EPFormatWebFilterInterface(baseurl);
            break;

        case "webexhibitor":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebExhibitorInterface.js');
            return new EPFormatWebExhibitorInterface(baseurl);
            break;

        case "webagenda":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebAgendaInterface.js');
            return new EPFormatWebAgendaInterface(baseurl);
            break;

        case "webdataindex":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebDataIndexInterface.js');
            return new EPFormatWebDataIndexInterface(baseurl);
            break;

        case "epconnect":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebEPConnectInterface.js');
            return new EPFormatWebEPConnectInterface(baseurl);
            break;

        case "websettings":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebSettingsInterface.js');
            return new EPFormatWebSettingsInterface(baseurl);
            break;

        case "weather":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebWeatherInterface.js');
            return new EPFormatWebWeatherInterface(baseurl);
            break;

        case "surveys":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatSurveysInterface.js');
            return new EPFormatSurveysInterface(baseurl);
            break;

        case "survey":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatSurveyInterface.js');
            return new EPFormatSurveyInterface(baseurl);
            break;

        case "poll":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatPollInterface.js');
            return new EPFormatPollInterface(baseurl);
            break;

        case "programbuilder":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatProgramBuilderInterface.js');
            return new EPFormatProgramBuilderInterface(baseurl);
            break;

        case "abstracts":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatAbstractsInterface.js');
            return new EPFormatAbstractsInterface(baseurl);
            break;

        case "program":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatProgramInterface.js');
            return new EPFormatProgramInterface(baseurl);
            break;

        case "webattendeeportal":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebAttendeePortalInterface.js');
            return new EPFormatWebAttendeePortalInterface(baseurl);
            break;

        case "webcme":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebCMEInterface.js');
            return new EPFormatWebCMEInterface(baseurl);
            break;

        case "admin":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatAdminInterface.js');
            return new EPFormatAdminInterface(baseurl);
            break;

        case "cms_poster":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatPosterInterface.js');
            return new EPFormatPosterInterface(baseurl);
            break;

        case "websurvey":
            RequireOnce(baseurl+'common/EPFormat/js/EPFormat.js');
            RequireOnce(baseurl+'common/EPFormat/js/EPFormatWebSurveyInterface.js');
            return new EPFormatWebSurveyInterface(baseurl);
            break;

        default:
            return null;
            break;
        }//switch
    }
} // End class
