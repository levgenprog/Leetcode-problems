function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var mergeTwoLists = function(list1, list2) {
    if(list1 === null)
    return list2

    if(list2 === null)
        return list1

    let head = new ListNode(null);
    let cur = head;
    while(list2 !== null && list1 !== null)
    {
        if(list1.val <= list2.val)
        {
            cur.next = list1;
            list1 = list1.next;
        }
        else{
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 === null ? list2 : list1;
    return head.next;
};