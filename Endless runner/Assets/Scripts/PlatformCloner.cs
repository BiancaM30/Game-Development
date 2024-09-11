using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlatformCloner : MonoBehaviour
{
    public GameObject platform;
    
    Vector3 nextPlatformPoint;

    public static PlatformCloner instance;

    private void Awake(){
        instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        for(int i=0; i<15; i++){
            ClonePlatform();
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    
    public void ClonePlatform()
    {
        GameObject temp = Instantiate(platform, nextPlatformPoint, Quaternion.identity);
        nextPlatformPoint = temp.transform.GetChild(1).transform.position;
    }
}
