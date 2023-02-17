from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head == None or head.next == None:
            return head

        cur = head
        nxt = head.next
        prev = head
        cur.next = None

        while nxt != None:
            cur = nxt
            nxt = nxt.next
            cur.next = prev
            prev = cur
            
        return cur

            
        