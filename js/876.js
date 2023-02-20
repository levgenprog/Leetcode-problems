function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var middleNode = function(head) {
    if(head === null){
        return head;
    }

    let cnt = 0;
    let cur = head
    while(cur)
    {
        cur = cur.next;
        cnt++;
    }
    let ans = head;
    if (cnt % 2 != 0)
    {
        for(let i = 0; i < cnt / 2 - 1; i++)
        {
            ans = ans.next;
        }
    }
    else{
        for(let i = 0; i < cnt / 2; i++)
        {
            ans = ans.next;
        }
    }
    return ans;
};