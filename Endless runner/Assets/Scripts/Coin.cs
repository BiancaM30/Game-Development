using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Coin : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.Rotate(0f, 0f, 5f, Space.Self);
    }

    private void OnTriggerEnter(Collider other){
        if(other.gameObject.tag == "Player")
        {
            Destroy(gameObject);
            UIScore.instance.UpdateCoins();
        }
    }
}
