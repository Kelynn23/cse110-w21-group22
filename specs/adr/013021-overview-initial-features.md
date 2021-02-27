# [Overview - Initial Features]

* Status: [accepted]
* Deciders: [Brian, Kendall, Chanly, Yihe, Nicholas, Jennifer, Kelynn, Kevin, Catherine]
* Date: [2021-01-30] 

## Context and Problem Statement

How might we automate the manual framework of a Pomodoro timer technique to help users complete interval tasks?

We are selecting features for our Pomodoro timer.  

## Decision Drivers <!-- optional -->

* How long will these features take to implement?
* How much prerequisite knowledge do these features take to implement? 
* Will these actually help the user? 
* Are these features mandatory or nice to have? 
* How dividable are these features? 

## Considered Options

### No
* Light pulse as notification  (UI: color changes from light to dark or something like that ) 
* Voice recognition feature and additional resources on being productive
* Multiple timer option presets (login) 
* Users rate how productive they were, then present them a graph at the end of the day/week to show them at what time of the day they are the most productive
* TOMAGACHI HELLO KITTY POMO
* Ranking / competitive motivation 
* Emoji animal or plant motivator animation wheeee - encouraging messages or animations  

### Maybe - Stretch Goals 
* Finish by X time (o’clock?) or by X pomos 
* Keyboard shortcuts 
* Small static explanation of how pomodoro works / a tutorial (popup first time)

### Maybe - Stretch Goals 
* The app can  block websites during pomodoro timer
* UI: circular time 
* Squares productivity (i.e. GitHub)
* Activity during break 
* “Statistics” module where it displays things like how many pomos you have planned for today, how many pomos you have already finished, so they could get a sense of what’s their progress of the day. It could also display some history data such as daily average they finished last week, which might help them to make more reasonable plans.

Potnetially pie or ring chart? Track by week?

## Decision Outcome

### Yes
* Reset timer 
* Notication on end - popup or text on page or animation of finish or like it checks off on the todo list 
* Running time as browser name (part of it + the actual timer name) 
* “Finish task” button so the users can skip remaining pomos if they finished earlier than they planned. It could also have some notification after the planned cycles is over for a task, which ask the user if they are done and want to move on to the next task, or if they still need to add extra pomos for the current one.
* UI: start/stop as same button 
* Toggle autostart  
* Add pomos 

### Yes - Stretch Goals
* To-do list on the side where the you could list out your tasks for the day and a general idea of how long each task will take
* UI: Do not have add tasks as a modal but rather inline
* The app could allow users to modify how long the study time and the break time is? It could also have some presets like the classic Pomo and 30-30 and so on
* Ui: Toggle visual display of time left 
* UI: Dark mode 
* Rewards with a cute animal picture or anything else every X minutes or during break or end of session 
* Gamification (like forest -> grow trees)
* Notification sound on browser when timer ends or moves onto next part (auto) 

### Positive Consequences

* With features that we selected to do for sure and ones that we have as stretch goals, we are giving ourselves the flexibility of being able to finish the goals we want while still having extra challenges if we read those milestones 


## Pros and Cons of the Options 

* Please see other ADRs for full option analyses + reviews

