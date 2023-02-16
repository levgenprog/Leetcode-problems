var isSubsequence = function() {
    let s = "abc";
    let t = "ahbgdc";
    let prev = 0;
    for (let i = 0; i < t.length; i++){

        if (s[prev] == t[i])
        {
            prev++;
        }
        prev = cur;
    }
    return prev === s.length;
};