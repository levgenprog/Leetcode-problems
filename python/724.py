from typing import List


class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        for i in range(len(nums)):
            if self.compare_sums(nums, i):
                return i
        return -1

    def compare_sums(self, nums: List[int], pivot: int)->bool:
        sl = sum(nums[:pivot])
        sr = sum(nums[pivot+1:])
        if sl == sr:
            return True

        return False