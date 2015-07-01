BillOrganizer.Calculator = function(bill){
  this.bill = bill;
  this.relevantDays = function(roommate){
    var billStartDate = new Date(bill.escape("from_date"));
    var billEndDate = new Date(bill.escape("end_date"));
    var roommateStartDate = new Date(roommate.escape("from_date"));
    var roommateEndDate = new Date(roommate.escape("end_date"));
    var relevantStartDate;
    var relevantEndDate;
    if (roommateStartDate.getTime() > billStartDate.getTime()){
      relevantStartDate = roommateStartDate;
    } else {
      relevantStartDate = billStartDate;
    }
    if (relevantStartDate.getTime() > billEndDate.getTime()){
      return 0;
    }
    if (roommateEndDate.getTime() > billEndDate.getTime()){
      relevantEndDate = billEndDate;
    } else {
      relevantEndDate = roommateEndDate;
    }
    if (relevantEndDate.getTime() < billStartDate.getTime()){
      return 0;
    }
    var days = (relevantEndDate - relevantStartDate) / (1000*24*60*60);
    return days;
  };

  this.totalDays = function(){
    var total = 0;
    this.bill.roommates().each(function(roommate){
      total += this.relevantDays(roommate);
    }.bind(this));
    return total;
  };

  this.owedAmount = function(roommate){
    var days = this.relevantDays(roommate);
    var totalDays = this.totalDays();
    var amount = parseFloat(this.bill.escape("amount"));
    return (amount * (days / totalDays)).toFixed(2);
  };
};
