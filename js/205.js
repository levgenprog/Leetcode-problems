var isIsomorphic = function(s, t) {
    // let a = "egg";
    // let b = "add";

    let m1 = [];
    let m2 = [];

    if (s.length != t.length)
        return false;

    for (let i = 0; i < s.length; i++)
    {
        if (m1[s.charAt(i)] != m2[t.charAt(i)])
        {
            return false;
        }
        m1[s.charAt(i)] = i+1;
        m2[t.charAt(i)] = i+1;
    }
    return true;

    
};