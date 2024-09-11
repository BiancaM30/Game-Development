using System.Collections;
using System.Collections.Generic;
using UnityEngine;
// using UnityEngine.UI;
using TMPro;

public class UIScore : MonoBehaviour
{
    public TextMeshProUGUI scoreText;
    
    //public Text scoreText;

    public int score = 0;

    public static UIScore instance;

    public void Awake() 
    {
            instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void UpdateCoins()
    {
        score++;
        scoreText.text = "Score: " + score;
    }
}
