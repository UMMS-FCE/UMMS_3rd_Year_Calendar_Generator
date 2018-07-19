#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(tidyverse)

# Define UI for application that draws a histogram
ui <- fluidPage(
  # Application title
  titlePanel("UMMS 3rd Year Calendar Generator"),
  # theme
  tags$head(
    tags$style(HTML("
                    h1, h2, h3, h4, h5, h6 {
                        color: #0072B2;
                    }
                    label {
                        color: #AA0A3C;
                    }
                    
                    ")),
    # Custom shiny to javascript binding
    # scrolls "outDiv" to bottom once called
    tags$script(
      '
      Shiny.addCustomMessageHandler("scrollToCalPlot",
        function(arg1) {
          $(\'html, body\').animate({
          scrollTop: $("#calendarPlot").offset().top
            }, 1000);
        }
      );'
    )
    ),

  fluidRow(
    column(3, wellPanel(
      # Start Date
      tags$h4("Pick Start Date"),
      tags$p(HTML("<strong>1)</strong>"), " First pick first day of rotations not including transition course, the rest of the dates will be automatically generated"),
      br(),
      tags$p(HTML("<strong>2)</strong>"), " Then download the schedule below after picking rotation orders"),
      dateInput("start_date", "Start Date (default is 2018-2019 start date):", value = "2018-05-07")
    ), 
    wellPanel(
      tags$h2("Rotation Specific Schedule"),
      tags$p("Name of file when downloading schedule"),
      textInput("download_schedule_name", "Download Name",
                value = "my_schedule"),
      tags$h4("Thematic Section Order"),
      selectInput("schedule_select_sections", "Select Thematic Section Order:",
                  c("Family-Surgery-Medicine" = "Family-Surgery-Medicine",
                    "Family-Medicine-Surgery" = "Family-Medicine-Surgery",
                    "Medicine-Family-Surgery" = "Medicine-Family-Surgery",
                    "Medicine-Surgery-Family" = "Medicine-Surgery-Family",
                    "Surgery-Medicine-Family" = "Surgery-Medicine-Family",
                    "Surgery-Family-Medicine" = "Surgery-Family-Medicine")),
      tags$h4("Rotation Order for Each Section"),
      selectInput("schedule_select_family",   "Select Family Block Rotation Order:",
                  c("Peds-Family-Psych" = "Peds-Family-Psych",
                    "Peds-Psych-Family" = "Peds-Psych-Family",
                    "Psych-Peds-Family" = "Psych-Peds-Family",
                    "Psych-Family-Peds" = "Psych-Family-Peds",
                    "Family-Psych-Peds" = "Family-Psych-Peds",
                    "Family-Peds-Psych" = "Family-Peds-Psych")),
      selectInput("schedule_select_surgery",  "Select Surgery Block Rotation Order:",
                  c("Gen-Specialty-OB/GYN" = "Gen-Specialty-OB/GYN",
                    "Gen-OB/GYN-Specialty" = "Gen-OB/GYN-Specialty",
                    "OB/GYN-Gen-Specialty" = "OB/GYN-Gen-Specialty",
                    "OB/GYN-Specialty-Gen" = "OB/GYN-Specialty-Gen",
                    "Specialty-OB/GYN-Gen" = "Specialty-OB/GYN-Gen",
                    "Specialty-Gen-OB/GYN" = "Specialty-Gen-OB/GYN")),
      selectInput("schedule_select_medicine", "Select Medicine Block Rotation Order:",
                  c("UWards-Community-Neuro/Amp" = "UWards-Community-Neuro/Amp",
                    "UWards-Neuro/Amp-Community" = "UWards-Neuro/Amp-Community",
                    "Neuro/Amp-UWards-Community" = "Neuro/Amp-UWards-Community",
                    "Neuro/Amp-Community-UWards" = "Neuro/Amp-Community-UWards",
                    "Community-Neuro/Amp-UWards" = "Community-Neuro/Amp-UWards",
                    "Community-UWards-Neuro/Amp" = "Community-UWards-Neuro/Amp"))
    ),wellPanel(
      tags$h2("Downloads"),
      tags$h4("Download Table"),
      tags$p("Download start and end dates of your specific schedule"),
      downloadButton("downloadScheduleDatesTable", "Download Dates Table For Schedule", class = "btn-success"),
      tags$h4("Download Calendar"),
      tags$p("Download a calendar image of your schedule"),
      downloadButton("downloadCalendarButton", "Download Calendar Image", class = "btn-success")
    ),wellPanel(
      tags$h3("Display Calendar"),
      tags$p("Generate a calendar image of your schedule at the bottom of the page"),
      actionButton("plotCalendarButton", "Generate Calendar", class = "btn-info")
    ), 
    wellPanel(
      tags$h1("Generic Schedule"),
      tags$p("Download generic schedule of start and end dates for each block"),
      downloadButton("downloadDatesTable", "Download All Dates Table", class = "btn-success")
    )
    ),
    column(3,
           verbatimTextOutput("text"),
           uiOutput("all_dates")
    ),
    column(3,
           uiOutput("fce_dates")
    )
  ), 
  fluidRow(
     mainPanel(
        plotOutput("calendarPlot", height = "800px")
     )
  )
)

# Define server logic 
server <- function(input, output, session) {
  # function for getting the next weekday (Sunday, Monday, etc) from a specific date,
  # if the input date matches that week day, it will just return the input date
  getNextWeekday<-function(inputDate, weekday, dateFormat ="%m/%d/%Y"){
    if(!(weekday %in% weekdays(x=as.Date(seq(7), origin="1949-01-01")))){
      stop(paste0("Day ", weekday, "is not a recongized weekday, options are ", paste(weekdays(x=as.Date(seq(7), origin="1949-01-01")), collapse = ", ")))
    }
    if("Date" != class(inputDate)){
      inputDate <-  as.Date(inputDate, dateFormat)
    }
    next_days <- seq(inputDate, inputDate+6,by='day')
    return(next_days[weekdays(next_days)==weekday])
  }
  # function for getting the previous weekday (Sunday, Monday, etc) from a specific date,
  # if the input date matches that week day, it will just return the input date
  getPreviousWeekday<-function(inputDate, weekday, dateFormat ="%m/%d/%Y"){
    if(!(weekday %in% weekdays(x=as.Date(seq(7), origin="1949-01-01")))){
      stop(paste0("Day ", weekday, "is not a recongized weekday, options are ", paste(weekdays(x=as.Date(seq(7), origin="1949-01-01")), collapse = ", ")))
    }
    if("Date" != class(inputDate)){
      inputDate <-  as.Date(inputDate, dateFormat)
    }
    prev_days <- seq(inputDate-6, inputDate,by='day')
    return(prev_days[weekdays(prev_days)==weekday])
  }
  # Get the first weekday (non Sunday/Saturday) from a specfic date,
  # input date will be returned if it is already a weekday
  getFirstWeekday<-function(inputDate, dateFormat ="%m/%d/%Y"){
    if("Date" != class(inputDate)){
      inputDate <-  as.Date(inputDate, dateFormat)
    }
    while(weekdays(inputDate) %in% c("Sunday", "Saturday")){
      inputDate = inputDate + 1
    }
    return (inputDate)
  }
  # Get the previous Sunday from a day
  getPreviousSunday<-function(inputDate, dateFormat ="%m/%d/%Y"){
    getPreviousWeekday(inputDate, "Sunday", dateFormat)
  }
  # Get the next Saturday from a day
  getNextSaturday<-function(inputDate, dateFormat ="%m/%d/%Y"){
    getNextWeekday(inputDate, "Saturday", dateFormat)
  }
  
  # Get the next year from a date (2019 for a date from 2018)
  getNextYear<-function(inputDate, dateFormat ="%m/%d/%Y"){
    return (as.integer(format(as.Date(inputDate, dateFormat), "%Y")) + 1)
  }
  
  # Displaying the current choosen start date 
  output$text <- renderText({
    sundayStartDate = getPreviousSunday(input$start_date)
    paste("Start Date is:", input$start_date, "\nRest of the dates are automatically generated,\ntweak if necessary")
  })
  
  # Rendering all the block/vaction dates with date chooser for tweaking the days
  output$all_dates <- renderUI({
    if(is.null(input$start_date)){
      return(list())
    }
    
    sundayStartDate = getPreviousSunday(input$start_date)
    Block1aDays = seq(sundayStartDate + 1, sundayStartDate + 33, by = "day")
    Section1Isc1 = getNextWeekday(Block1aDays[length(Block1aDays)], "Monday")
    Block1bDays = seq(Section1Isc1 + 1, Section1Isc1 + 32, by = "day")
    Block1cDays = seq(getNextWeekday(Block1bDays[length(Block1bDays)], "Monday"), getNextWeekday(Block1bDays[length(Block1bDays)], "Monday") + 1 + 30, by = "day")
    Section1Isc2 = Block1cDays[length(Block1cDays)] + 1
    Section1Vacation = seq(Section1Isc2 + 1, getNextWeekday(getNextWeekday(Section1Isc2, "Sunday") + 1, "Sunday"), by = "day")
    
    
    Block2aDays = seq(Section1Vacation[length(Section1Vacation)] + 1, Section1Vacation[length(Section1Vacation)] + 1 + 32, by = "day")
    Block2bDays = seq(getNextWeekday(Block2aDays[length(Block2aDays)], "Monday"), Block2aDays[length(Block2aDays)] + 1+ 32, by = "day")
    Section2Isc1 = Block2bDays[length(Block2bDays)] + 1
    Section2Careers_in_Medicine = Section2Isc1 + 1
    Block2cDays = seq(getNextWeekday(Section2Careers_in_Medicine, "Monday"), getNextWeekday(getNextWeekday(Section2Careers_in_Medicine, "Monday") + 34, "Thursday"), by = "day")
    Section2EndIsc1 = Block2cDays[length(Block2cDays)] + 1
    Section2EndIsc2 = getNextWeekday(Section2EndIsc1, "Monday")
    Section2Careers_in_Medicine2 = Section2EndIsc2 + 1
    Section2Vacation = seq(Section2Careers_in_Medicine2 + 1, getFirstWeekday(as.Date(paste0("01/02/", getNextYear(Section2Careers_in_Medicine2) ), format = "%m/%d/%Y" )) - 1 , by = "days")
    
    
    
    Section3Isc1 = Section2Vacation[length(Section2Vacation)] + 1
    Block3aDays = seq(Section3Isc1 + 1, getNextWeekday(Section3Isc1 + 1 + 34, "Friday"), by = "day")
    Block3bDays = seq(getNextWeekday(Block3aDays[length(Block3aDays)], "Monday"), getNextWeekday(Block3aDays[length(Block3aDays)], "Monday") + 32, by = "day")
    Section3Vacation = seq(Block3bDays[length(Block3bDays)] + 1, getNextWeekday(getNextWeekday(Block3bDays[length(Block3bDays)], "Sunday") + 1, "Sunday"), by = "day")
    Block3cDays = seq(Section3Vacation[length(Section3Vacation)] + 1, getNextWeekday(Section3Vacation[length(Section3Vacation)]+ 30, "Thursday"), by = "day")
    Section3Careers_in_Medicine = Block3cDays[length(Block3cDays)]
    Section3Isc2 = Section3Careers_in_Medicine + 1
    
    
    return(list(wellPanel(dateRangeInput("Block1a", "Block1a Dates:",
                                         start = Block1aDays[1],
                                         end   = Block1aDays[length(Block1aDays)]),
                          dateInput("Section1Isc1", "Section1Isc1:", value = Section1Isc1),
                          dateRangeInput("Block1b", "Block1b Dates:",
                                         start = Block1bDays[1],
                                         end   = Block1bDays[length(Block1bDays)]),
                          dateRangeInput("Block1c", "Block1c Dates:",
                                         start = Block1cDays[1],
                                         end   = Block1cDays[length(Block1cDays)]),
                          dateInput("Section1Isc2", "Section1Isc2:", value = Section1Isc2),
                          dateRangeInput("Section1Vacation", "Summer Vacation:",
                                         start = Section1Vacation[1],
                                         end   = Section1Vacation[length(Section1Vacation)]) 
    ),
    wellPanel(dateRangeInput("Block2a", "Block2a Dates:",
                             start = Block2aDays[1],
                             end   = Block2aDays[length(Block2aDays)]),
              dateRangeInput("Block2b", "Block2b Dates:",
                             start = Block2bDays[1],
                             end   = Block2bDays[length(Block2bDays)]),
              dateInput("Section2Isc1", "Section2Isc1:", value = Section2Isc1),
              dateInput("Section2Careers_in_Medicine", "Section2Careers_in_Medicine:", value = Section2Careers_in_Medicine),
              dateRangeInput("Block2c", "Block2c Dates:",
                             start = Block2cDays[1],
                             end   = Block2cDays[length(Block2cDays)]),
              dateInput("Section2EndIsc1", "Section2EndIsc1:", value = Section2EndIsc1),
              dateInput("Section2EndIsc2", "Section2EndIsc2:", value = Section2EndIsc2),
              dateInput("Section2Careers_in_Medicine2", "Section2Careers_in_Medicine2:", value = Section2Careers_in_Medicine2),
              dateRangeInput("Section2Vacation", "Winter Vacation:",
                             start = Section2Vacation[1],
                             end   = Section2Vacation[length(Section2Vacation)])
    ),
    wellPanel( dateInput("Section3Isc1", "Section3Isc1:", value = Section3Isc1),
               dateRangeInput("Block3a", "Block3aDays Dates:",
                              start = Block3aDays[1],
                              end   = Block3aDays[length(Block3aDays)]),
               dateRangeInput("Block3b", "Block3bDays Dates:",
                              start = Block3bDays[1],
                              end   = Block3bDays[length(Block3bDays)]),
               dateRangeInput("Section3Vacation", "Spring Vacation:",
                              start = Section3Vacation[1],
                              end   = Section3Vacation[length(Section3Vacation)]),
               dateRangeInput("Block3c", "Block3cDays Dates:",
                              start = Block3cDays[1],
                              end   = Block3cDays[length(Block3cDays)]),
               dateInput("Section3Careers_in_Medicine", "Section3Careers_in_Medicine:", value = Section3Careers_in_Medicine),
               dateInput("Section3Isc2", "Section3Isc2:", value = Section3Isc2)
               
    )
    ))
    
  })
 
  # Rendering all the FCE dates with date chooser for tweaking the days
  output$fce_dates <- renderUI({
    if(is.null(input$Block1a)){
      return(list())
    }
    Block1aFCEWeek = seq(input$Block1a[2]-4, input$Block1a[2],     by = "days")
    Block1bFCEWeek = seq(input$Block1b[2]-4, input$Block1b[2],     by = "days")
    Block1cFCEWeek = seq(input$Block1c[1],   input$Block1c[1] + 4, by = "days")
    
    Block2aFCEWeek = seq(input$Block2a[2]-4, input$Block2a[2],     by = "days")
    Block2bFCEWeek = seq(input$Block2b[1],   input$Block2b[1] + 4, by = "days")
    Block2cFCEWeek = seq(input$Block2c[1],   input$Block2c[1] + 4, by = "days")
    
    Block3aFCEWeek = seq(input$Block3a[2]-4, input$Block3a[2],     by = "days")
    Block3bFCEWeek = seq(input$Block3b[2]-4, input$Block3b[2],     by = "days")
    Block3cFCEWeek = seq(input$Block3c[1],   input$Block3c[1] + 4, by = "days")
    
    return(list(wellPanel(
      dateRangeInput("Block1aFCEWeek", "Block1aFCEWeek Dates:",
                     start = Block1aFCEWeek[1],
                     end   = Block1aFCEWeek[length(Block1aFCEWeek)]),
      dateRangeInput("Block1bFCEWeek", "Block1bFCEWeek Dates:",
                     start = Block1bFCEWeek[1],
                     end   = Block1bFCEWeek[length(Block1bFCEWeek)]),
      dateRangeInput("Block1cFCEWeek", "Block1cFCEWeek Dates:",
                     start = Block1cFCEWeek[1],
                     end   = Block1cFCEWeek[length(Block1cFCEWeek)])),
      
      wellPanel(
        dateRangeInput("Block2aFCEWeek", "Block2aFCEWeek Dates:",
                       start = Block2aFCEWeek[1],
                       end   = Block2aFCEWeek[length(Block2aFCEWeek)]),
        dateRangeInput("Block2bFCEWeek", "Block2bFCEWeek Dates:",
                       start = Block2bFCEWeek[1],
                       end   = Block2bFCEWeek[length(Block2bFCEWeek)]),
        dateRangeInput("Block2cFCEWeek", "Block2cFCEWeek Dates:",
                       start = Block2cFCEWeek[1],
                       end   = Block2cFCEWeek[length(Block2cFCEWeek)])),
      
      wellPanel(
        dateRangeInput("Block3aFCEWeek", "Block3aFCEWeek Dates:",
                       start = Block3aFCEWeek[1],
                       end   = Block3aFCEWeek[length(Block3aFCEWeek)]),
        dateRangeInput("Block3bFCEWeek", "Block3bFCEWeek Dates:",
                       start = Block3bFCEWeek[1],
                       end   = Block3bFCEWeek[length(Block3bFCEWeek)]),
        dateRangeInput("Block3cFCEWeek", "Block3cFCEWeek Dates:",
                       start = Block3cFCEWeek[1],
                       end   = Block3cFCEWeek[length(Block3cFCEWeek)])
        
      )
    )
    )
  })
  
  # Downloadable csv of the generic dates
  output$downloadDatesTable <- downloadHandler(
    filename = function() {
      paste( "dates", ".csv", sep = "")
    },
    content = function(file) {
      outputTable = data_frame()
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1a",
                                         start_date = input$Block1a[1],
                                         end_date =   input$Block1a[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1b",
                                         start_date = input$Block1b[1],
                                         end_date =   input$Block1b[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1c",
                                         start_date = input$Block1c[1],
                                         end_date =   input$Block1c[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1aFCEWeek",
                                         start_date = input$Block1aFCEWeek[1],
                                         end_date =   input$Block1aFCEWeek[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1bFCEWeek",
                                         start_date = input$Block1bFCEWeek[1],
                                         end_date =   input$Block1bFCEWeek[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1cFCEWeek",
                                         start_date = input$Block1cFCEWeek[1],
                                         end_date =   input$Block1cFCEWeek[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2a",
                                         start_date = input$Block2a[1],
                                         end_date =   input$Block2a[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2b",
                                         start_date = input$Block2b[1],
                                         end_date =   input$Block2b[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2c",
                                         start_date = input$Block2c[1],
                                         end_date =   input$Block2c[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2aFCEWeek",
                                         start_date = input$Block2aFCEWeek[1],
                                         end_date =   input$Block2aFCEWeek[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2bFCEWeek",
                                         start_date = input$Block2bFCEWeek[1],
                                         end_date =   input$Block2bFCEWeek[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2cFCEWeek",
                                         start_date = input$Block2cFCEWeek[1],
                                         end_date =   input$Block2cFCEWeek[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3a",
                                         start_date = input$Block3a[1],
                                         end_date =   input$Block3a[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3b",
                                         start_date = input$Block3b[1],
                                         end_date =   input$Block3b[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3c",
                                         start_date = input$Block3c[1],
                                         end_date =   input$Block3c[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3aFCEWeek",
                                         start_date = input$Block3aFCEWeek[1],
                                         end_date =   input$Block3aFCEWeek[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3bFCEWeek",
                                         start_date = input$Block3bFCEWeek[1],
                                         end_date =   input$Block3bFCEWeek[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3cFCEWeek",
                                         start_date = input$Block3cFCEWeek[1],
                                         end_date =   input$Block3cFCEWeek[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section1Vacation",
                                         start_date = input$Section1Vacation[1],
                                         end_date =   input$Section1Vacation[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Vacation",
                                         start_date = input$Section2Vacation[1],
                                         end_date =   input$Section2Vacation[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Vacation",
                                         start_date = input$Section3Vacation[1],
                                         end_date =   input$Section3Vacation[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section1Isc1",
                                         start_date = input$Section1Isc1,
                                         end_date =   input$Section1Isc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section1Isc2",
                                         start_date = input$Section1Isc2,
                                         end_date =   input$Section1Isc2) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Isc1",
                                         start_date = input$Section2Isc1,
                                         end_date =   input$Section2Isc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Careers_in_Medicine",
                                         start_date = input$Section2Careers_in_Medicine,
                                         end_date =   input$Section2Careers_in_Medicine) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2EndIsc1",
                                         start_date = input$Section2EndIsc1,
                                         end_date =   input$Section2EndIsc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2EndIsc2",
                                         start_date = input$Section2EndIsc2,
                                         end_date =   input$Section2EndIsc2) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Careers_in_Medicine2",
                                         start_date = input$Section2Careers_in_Medicine2,
                                         end_date =   input$Section2Careers_in_Medicine2) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Isc1",
                                         start_date = input$Section3Isc1,
                                         end_date =   input$Section3Isc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Careers_in_Medicine",
                                         start_date = input$Section3Careers_in_Medicine,
                                         end_date =   input$Section3Careers_in_Medicine) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Isc2",
                                         start_date = input$Section3Isc2,
                                         end_date =   input$Section3Isc2) )
      
      
      
      
      outputTable = outputTable %>%
        arrange(start_date)
      
      write_csv(outputTable, file)
    }
  )
  
  # Downloadable csv of rotation specific dates
  output$downloadScheduleDatesTable <- downloadHandler(
    filename = function() {
      paste0(input$download_schedule_name, ".csv")
    },
    content = function(file) {
      # outputTable = data_frame(class = c(), 
      #                          start_date = c(), 
      #                          end_date = c())
      
      
      sectionOrder = unlist(strsplit(input$schedule_select_sections, "-"))
      
      subBlocksOrder = list(
        Family = unlist(strsplit(input$schedule_select_family, "-")),
        Surgery = unlist(strsplit(input$schedule_select_surgery, "-")),
        Medicine = unlist(strsplit(input$schedule_select_medicine, "-")))
      
      blockOrder = c()
      for(section in sectionOrder){
        blockOrder = c(blockOrder, subBlocksOrder[[section]])
      }
      
      fourWeekBlocks = c("UWards", "Community", "Gen", "Specialty")
      outputTable = data_frame()
      
      
      
      # 
      if(blockOrder[1] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block1aFCEWeek",
                                           start_date = input$Block1aFCEWeek[1],
                                           end_date =   input$Block1aFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block1a-", blockOrder[1]),
                                           start_date = input$Block1a[1],
                                           end_date =   input$Block1aFCEWeek[2]-7) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block1a-", blockOrder[1]),
                                           start_date = input$Block1a[1],
                                           end_date =   input$Block1a[2]) )
      }
      if(blockOrder[2] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block1bFCEWeek",
                                           start_date = input$Block1bFCEWeek[1],
                                           end_date =   input$Block1bFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block1b-", blockOrder[2]),
                                           start_date = input$Block1b[1],
                                           end_date =   input$Block1bFCEWeek[2] -7) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block1b-", blockOrder[2]),
                                           start_date = input$Block1b[1],
                                           end_date =   input$Block1b[2]) )
      }
      if(blockOrder[3] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block1cFCEWeek",
                                           start_date = input$Block1cFCEWeek[1],
                                           end_date =   input$Block1cFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block1c-", blockOrder[3]),
                                           start_date = input$Block1cFCEWeek[1] + 7,
                                           end_date =   input$Block1c[2]) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block1c-", blockOrder[3]),
                                           start_date = input$Block1c[1],
                                           end_date =   input$Block1c[2]) )
      }
      # 
      # 
      
      
      
      
      if(blockOrder[4] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block2aFCEWeek",
                                           start_date = input$Block2aFCEWeek[1],
                                           end_date =   input$Block2aFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block2a-", blockOrder[4]),
                                           start_date = input$Block2a[1],
                                           end_date =   input$Block2aFCEWeek[2] - 7) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block2a-", blockOrder[4]),
                                           start_date = input$Block2a[1],
                                           end_date =   input$Block2a[2]) )
      }
      if(blockOrder[5] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block2bFCEWeek",
                                           start_date = input$Block2bFCEWeek[1],
                                           end_date =   input$Block2bFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block2b-", blockOrder[5]),
                                           start_date = input$Block2bFCEWeek[1] + 7,
                                           end_date =   input$Block2b[2]) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block2b-", blockOrder[5]),
                                           start_date = input$Block2b[1],
                                           end_date =   input$Block2b[2]) )
      }
      if(blockOrder[6] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block2cFCEWeek",
                                           start_date = input$Block2cFCEWeek[1],
                                           end_date =   input$Block2cFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block2c-", blockOrder[6]),
                                           start_date = input$Block2cFCEWeek[1] + 7,
                                           end_date =   input$Block2c[2]) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block2c-", blockOrder[6]),
                                           start_date = input$Block2c[1],
                                           end_date =   input$Block2c[2]) )
      }
      # 
      
      
      
      
      if(blockOrder[7] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block3aFCEWeek",
                                           start_date = input$Block3aFCEWeek[1],
                                           end_date =   input$Block3aFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block3a-", blockOrder[7]),
                                           start_date = input$Block3a[1],
                                           end_date =   input$Block3aFCEWeek[2] - 7) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block3a-", blockOrder[7]),
                                           start_date = input$Block3a[1],
                                           end_date =   input$Block3a[2]) )
      }
      if(blockOrder[8] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block3bFCEWeek",
                                           start_date = input$Block3bFCEWeek[1],
                                           end_date =   input$Block3bFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block3b-", blockOrder[8]),
                                           start_date = input$Block3b[1],
                                           end_date =   input$Block3bFCEWeek[2] - 7) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block3b-", blockOrder[8]),
                                           start_date = input$Block3b[1],
                                           end_date =   input$Block3b[2]) )
      }
      if(blockOrder[9] %in% fourWeekBlocks){
        outputTable = bind_rows(outputTable,
                                data_frame(class = "Block3cFCEWeek",
                                           start_date = input$Block3cFCEWeek[1],
                                           end_date =   input$Block3cFCEWeek[2]) )
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block3c-", blockOrder[9]),
                                           start_date = input$Block3cFCEWeek[1] + 7,
                                           end_date =   input$Block3c[2]) )
      }else{
        outputTable = bind_rows(outputTable,
                                data_frame(class = paste0("Block3c-", blockOrder[9]),
                                           start_date = input$Block3c[1],
                                           end_date =   input$Block3c[2]) )
      }
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section1Vacation",
                                         start_date = input$Section1Vacation[1],
                                         end_date =   input$Section1Vacation[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Vacation",
                                         start_date = input$Section2Vacation[1],
                                         end_date =   input$Section2Vacation[2]) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Vacation",
                                         start_date = input$Section3Vacation[1],
                                         end_date =   input$Section3Vacation[2]) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section1Isc1",
                                         start_date = input$Section1Isc1,
                                         end_date =   input$Section1Isc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section1Isc2",
                                         start_date = input$Section1Isc2,
                                         end_date =   input$Section1Isc2) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Isc1",
                                         start_date = input$Section2Isc1,
                                         end_date =   input$Section2Isc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Careers_in_Medicine",
                                         start_date = input$Section2Careers_in_Medicine,
                                         end_date =   input$Section2Careers_in_Medicine) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2EndIsc1",
                                         start_date = input$Section2EndIsc1,
                                         end_date =   input$Section2EndIsc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2EndIsc2",
                                         start_date = input$Section2EndIsc2,
                                         end_date =   input$Section2EndIsc2) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section2Careers_in_Medicine2",
                                         start_date = input$Section2Careers_in_Medicine2,
                                         end_date =   input$Section2Careers_in_Medicine2) )
      
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Isc1",
                                         start_date = input$Section3Isc1,
                                         end_date =   input$Section3Isc1) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Careers_in_Medicine",
                                         start_date = input$Section3Careers_in_Medicine,
                                         end_date =   input$Section3Careers_in_Medicine) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Section3Isc2",
                                         start_date = input$Section3Isc2,
                                         end_date =   input$Section3Isc2) )
      
      
      
      
      outputTable = outputTable %>%
        arrange(start_date)
      
      write_csv(outputTable, file)
    }
  )

  # generate All days dataset, each row is a day
  genScheduleAllDays <- reactive({
    
    sectionOrder = unlist(strsplit(input$schedule_select_sections, "-"))
    
    subBlocksOrder = list(
      Family = unlist(strsplit(input$schedule_select_family, "-")),
      Surgery = unlist(strsplit(input$schedule_select_surgery, "-")),
      Medicine = unlist(strsplit(input$schedule_select_medicine, "-")))
    
    blockOrder = c()
    for(section in sectionOrder){
      blockOrder = c(blockOrder, subBlocksOrder[[section]])
    }
    
    fourWeekBlocks = c("UWards", "Community", "Gen", "Specialty")
    outputTable = data_frame()
    
    
    # 
    if(blockOrder[1] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1aFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block1aFCEWeek[1],
                                                    input$Block1aFCEWeek[2], by = "days")) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block1a-", blockOrder[1]),
                                         type = "Clerkship",
                                         days = seq(input$Block1a[1],
                                                    input$Block1aFCEWeek[2]-7, by = "days")) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block1a-", blockOrder[1]),
                                         type = "Clerkship",
                                         days = seq(input$Block1a[1],
                                                    input$Block1a[2], by = "days"))) 
    }

    if(blockOrder[2] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1bFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block1bFCEWeek[1], input$Block1bFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block1b-", blockOrder[2]),
                                         type = "Clerkship",
                                         days = seq(input$Block1b[1],input$Block1bFCEWeek[2] -7, by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block1b-", blockOrder[2]),
                                         type = "Clerkship",
                                         days = seq(input$Block1b[1], input$Block1b[2], by = "days") ) )    }

    if(blockOrder[3] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block1cFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block1cFCEWeek[1], input$Block1cFCEWeek[2], by="days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block1c-", blockOrder[3]),
                                         type = "Clerkship",
                                         days = seq(input$Block1cFCEWeek[1] + 7, input$Block1c[2], by="days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block1c-", blockOrder[3]),
                                         type = "Clerkship",
                                         days = seq(input$Block1c[1],input$Block1c[2], by="days") ) )
    }
    

    # 
    # 
    
    
    
    
    if(blockOrder[4] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2aFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block2aFCEWeek[1],   input$Block2aFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block2a-", blockOrder[4]),
                                         type = "Clerkship",
                                         days = seq(input$Block2a[1],   input$Block2aFCEWeek[2] - 7, by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block2a-", blockOrder[4]),
                                         type = "Clerkship",
                                         days = seq(input$Block2a[1],   input$Block2a[2], by = "days") ) )
    }
    if(blockOrder[5] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2bFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block2bFCEWeek[1],   input$Block2bFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block2b-", blockOrder[5]),
                                         type = "Clerkship",
                                         days = seq(input$Block2bFCEWeek[1] + 7,   input$Block2b[2], by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block2b-", blockOrder[5]),
                                         type = "Clerkship",
                                         days = seq(input$Block2b[1],   input$Block2b[2], by = "days") ) )
    }
    if(blockOrder[6] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block2cFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block2cFCEWeek[1],   input$Block2cFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block2c-", blockOrder[6]),
                                         type = "Clerkship",
                                         days = seq(input$Block2cFCEWeek[1] + 7,   input$Block2c[2], by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block2c-", blockOrder[6]),
                                         type = "Clerkship",
                                         days = seq(input$Block2c[1],   input$Block2c[2], by = "days") ) )
    }
    # 
    
    
    
    
    if(blockOrder[7] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3aFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block3aFCEWeek[1],   input$Block3aFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block3a-", blockOrder[7]),
                                         type = "Clerkship",
                                         days = seq(input$Block3a[1],   input$Block3aFCEWeek[2] - 7, by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block3a-", blockOrder[7]),
                                         type = "Clerkship",
                                         days = seq(input$Block3a[1],   input$Block3a[2], by = "days") ) )
    }
    if(blockOrder[8] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3bFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block3bFCEWeek[1],   input$Block3bFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block3b-", blockOrder[8]),
                                         type = "Clerkship",
                                         days = seq(input$Block3b[1],   input$Block3bFCEWeek[2] - 7, by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block3b-", blockOrder[8]),
                                         type = "Clerkship",
                                         days = seq(input$Block3b[1],   input$Block3b[2], by = "days") ) )
    }
    if(blockOrder[9] %in% fourWeekBlocks){
      outputTable = bind_rows(outputTable,
                              data_frame(class = "Block3cFCEWeek",
                                         type = "FCE",
                                         days = seq(input$Block3cFCEWeek[1],   input$Block3cFCEWeek[2], by = "days") ) )
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block3c-", blockOrder[9]),
                                         type = "Clerkship",
                                         days = seq(input$Block3cFCEWeek[1] + 7,   input$Block3c[2], by = "days") ) )
    }else{
      outputTable = bind_rows(outputTable,
                              data_frame(class = paste0("Block3c-", blockOrder[9]),
                                         type = "Clerkship",
                                         days = seq(input$Block3c[1],   input$Block3c[2], by = "days") ) )
    }
    
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section1Vacation",
                                       type = "Vacation",
                                       days = seq(input$Section1Vacation[1],   input$Section1Vacation[2], by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section2Vacation",
                                       type = "Vacation",
                                       days = seq(input$Section2Vacation[1],   input$Section2Vacation[2], by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section3Vacation",
                                       type = "Vacation",
                                       days = seq(input$Section3Vacation[1],   input$Section3Vacation[2], by = "days") ) )
    
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section1Isc1",
                                       type = "ISC",
                                       days = seq(input$Section1Isc1,   input$Section1Isc1, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section1Isc2",
                                       type = "ISC",
                                       days = seq(input$Section1Isc2,   input$Section1Isc2, by = "days") ) )
    
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section2Isc1",
                                       type = "ISC",
                                       days = seq(input$Section2Isc1,   input$Section2Isc1, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section2Careers_in_Medicine",
                                       type = "Careers_in_Medicine",
                                       days = seq(input$Section2Careers_in_Medicine,   input$Section2Careers_in_Medicine, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section2EndIsc1",
                                       type = "ISC",
                                       days = seq(input$Section2EndIsc1,   input$Section2EndIsc1, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section2EndIsc2",
                                       type = "ISC",
                                       days = seq(input$Section2EndIsc2,   input$Section2EndIsc2, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section2Careers_in_Medicine2",
                                       type = "Careers_in_Medicine",
                                       days = seq(input$Section2Careers_in_Medicine2,   input$Section2Careers_in_Medicine2, by = "days") ) )
    
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section3Isc1",
                                       type = "ISC",
                                       days = seq(input$Section3Isc1,   input$Section3Isc1, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section3Careers_in_Medicine",
                                       type = "Careers_in_Medicine",
                                       days = seq(input$Section3Careers_in_Medicine,   input$Section3Careers_in_Medicine, by = "days") ) )
    outputTable = bind_rows(outputTable,
                            data_frame(class = "Section3Isc2",
                                       type = "ISC",
                                       days = seq(input$Section3Isc2,   input$Section3Isc2, by = "days") ) )
    
    
    
    
    outputTable = outputTable %>%
      arrange(days)
    return (outputTable)
  })
  
  # generate calendar plot obj 
  genCalPlotObj <- reactive({
    allDays = genScheduleAllDays()
    startDate = allDays$days[1]
    allDays = allDays %>% 
      mutate(weekday = factor(weekdays(days), levels = c("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"))) %>% 
      mutate(month = as.integer(format(days, "%m") ),
             year = as.integer(format(days, "%Y") ),
             day = as.integer(format(days, "%d") )) %>% 
      mutate(firstOfTheMonth = as.Date(paste0("01/", month, "/", year), format = "%d/%m/%Y")) %>% 
      mutate(weekOfMonth = ceiling((day - 1  +  as.integer(factor(weekdays(firstOfTheMonth), levels = c("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"))))/7)) %>% 
      mutate(monthOfAcademicYear = 1 + abs(abs(month - as.integer(format(startDate, "%m"))) - 12 *(year - as.integer(format(startDate, "%Y") )) ) ) %>% 
      mutate(monthOfAcademicYearName = paste0(year, "-", month.name[month])) %>% 
      mutate(monthOfAcademicYearName = factor(monthOfAcademicYearName, levels = unique(monthOfAcademicYearName)))
    
    allDays = allDays %>% 
      mutate(fillBy = gsub(".*-", "", class)) %>% 
      mutate(fillBy = gsub("Section[0-9]", "", fillBy)) %>% 
      mutate(fillBy = ifelse(grepl("Isc", fillBy), "ISC", fillBy)) %>% 
      mutate(fillBy = ifelse(grepl("FCE", fillBy), "FCE", fillBy))%>% 
      mutate(fillBy = ifelse(grepl("Careers_in_Medicine", fillBy), "Careers_in_Medicine", fillBy))
    
    allDays = allDays %>% 
      mutate(daylabel = ifelse(weekday %in% c("Tuesday", "Wednesday", "Thursday") & !(fillBy %in% c("ISC", "Careers_in_Medicine")), "", day ) ) %>% 
      mutate(daylabel = ifelse("Wednesday" == weekday & !(fillBy %in% c("ISC", "Careers_in_Medicine")), fillBy, daylabel)) %>% 
      mutate(daylabel = ifelse(grepl("FCE", daylabel), class, daylabel))
    
    allDays = allDays %>% 
      mutate(withBorderColor = ifelse(weekday %in% c("Tuesday", "Wednesday", "Thursday") & !(fillBy %in% c("ISC", "Careers_in_Medicine")), "no", "yes" ) ) 
    
    dayTypeColors = c("#56B4E9", "#0072B2", "#009E73", "#F0E442", "#CC79A7")
    names(dayTypeColors) = c("Clerkship","ISC","Vacation","FCE","Careers_in_Medicine")
    
    calendar = ggplot(allDays) + 
      geom_tile(aes(y = 0 - weekOfMonth, x = weekday, fill = type, color  =  withBorderColor) ) + 
      geom_text(aes(label = daylabel, y = 0 - weekOfMonth, x = weekday)) + 
      facet_wrap(~monthOfAcademicYearName, ncol = 3, scales = "free_x") + 
      labs(y = "", x = "") + 
      theme_bw() + 
      theme(axis.text.x = element_text(hjust = 0, angle = -45), 
            axis.text.y = element_blank(),
            axis.ticks.y = element_blank(), 
            legend.position = "bottom") + 
      scale_color_manual(values = c(no = "#FFFFFF00", yes = "#000000"), guide = F) + 
      scale_fill_manual("Class Type", values = dayTypeColors)
    return(calendar)
  })
  
  # gen plot 
  genCalPlotShow     <- eventReactive(input$plotCalendarButton, {
    return(genCalPlotObj())
  })
  
  # Download plot
  output$downloadCalendarButton <- downloadHandler(
    filename = function() {
      paste0(input$download_schedule_name, ".pdf")
    },
    content = function(file) {
      pdf(file,width = 11, height = 8.5, useDingbats = F)
      print(genCalPlotObj())
      dev.off()
    }
  )
  
  #plotting calendar
  output$calendarPlot <- renderPlot({
    print(genCalPlotShow())
    # Call custom javascript to scroll window
    session$sendCustomMessage(type = "scrollToCalPlot", 1)
  })
  
  
  # Downloadable csv of dates all days
  output$downloadScheduleAllDays <- downloadHandler(
    filename = function() {
      paste(input$download_schedule_name, ".csv", sep = "")
    },
    content = function(file) {
      outputTable = genScheduleAllDays()
      write_csv(outputTable, file)
    }
  )
}

# Run the application 
shinyApp(ui = ui, server = server)

