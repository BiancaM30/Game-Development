using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public Rigidbody rigidbody;
    public float speed, horizontalmultiplier;
    private float horizontalinput;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        horizontalinput = Input.GetAxisRaw("Horizontal");
        
    }
    void FixedUpdate()
    {
        Vector3 forwardmove = transform.forward * speed * Time.fixedDeltaTime;
        Vector3 horizontalmove = transform.right * horizontalinput * Time.fixedDeltaTime * horizontalmultiplier;
        rigidbody.MovePosition(rigidbody.position + forwardmove + horizontalmove); 
    }
}
