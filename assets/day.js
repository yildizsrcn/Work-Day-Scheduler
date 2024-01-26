// Display the current day at the top of the calender when a user opens the planner.

// Present timeblocks for standard business hours when the user scrolls down.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page
$(function(){
    var currentDayEl = $("#currentDay")

    var containerEl = $(".container")
    
    var hours = [
        9, 10, 11, 12, 13, 14, 15, 16, 17,
    ]
    var timeslots=["9 am","10 am","11 am","12 pm","1 pm", "2 pm", "3 pm","4 pm","5 pm"]
    for (var i =0; i<hours.length;i++){
        var timeblock=$(`
        <div id="hour-${hours[i]}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${timeslots[i]}</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div> 
        `)
        containerEl.append(timeblock)
    }
    var currentDay = dayjs().format(`DD/MM/YYYY`);
    currentDayEl.text(currentDay)
    console.log(currentDay);

    var rightnow=dayjs().hour()
    console.log(rightnow)
    $(".time-block").each(function(){
        var currentblock=parseInt($(this).attr("id").split("-")[1])
        if(currentblock<rightnow){
            $(this).addClass("past")
        } else if (currentblock===rightnow){
            $(this).addClass("present")
        } else {
            $(this).addClass("future")
        }
    })
    
$(".saveBtn").on("click",function(){
    var textBox=$(this).siblings(".description").val()
    var block=$(this).parent().attr("id")
    localStorage.setItem(block,textBox)
})
for (var i=0; i<=hours.length; i++){
    $(`#hour-${hours[i]} .description`).val(localStorage.getItem(`hour-${hours[i]}`))
}
})
