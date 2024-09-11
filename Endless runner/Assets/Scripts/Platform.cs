using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Platform : MonoBehaviour
{
    public GameObject obstacle;

    public GameObject coin;
    
    // Start is called before the first frame update
    void Start()
    {
        CloneObstacle();
        CloneCoin();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerExit(Collider other)
    {
        PlatformCloner.instance.ClonePlatform();
        Destroy(gameObject,2f);
    }

    public void CloneObstacle()
    {
        int rand = Random.Range(2,5);
        Transform clonePoint = transform.GetChild(rand).transform;
        Instantiate(obstacle, clonePoint.position, Quaternion.identity, transform);
    }

    public void CloneCoin()
    {
         int rand1 = Random.Range(5, 8);
        Transform clonePoint1 = transform.GetChild(rand1).transform;
        Instantiate(coin, clonePoint1.position + new Vector3(0, 0.5f, 0), coin.transform.rotation, transform);

        int rand2 = Random.Range(8, 11);
        Transform clonePoint2 = transform.GetChild(rand2).transform;
        Instantiate(coin, clonePoint2.position + new Vector3(0, 0.5f, 0), coin.transform.rotation, transform);

    }

    
}
