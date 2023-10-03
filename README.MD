🚧 UNDER CONSTRUCTION 🚧

Live build progress: https://ascii-sandbox.vercel.app/

# ASCII Sandbox

This project was initiallly created for Calhack's AI Hackathon. 

Please navigate to the ai-hackathon branch or follow this link if you're interested in the code for the submission: https://github.com/Cbannon35/ascii-sandbox/tree/ai-hackathon-2023

## Blurb

After playing around with my newfound acess to GPT plugins I stumbled upon "Figlet". A plugin which would generate ASCII based on the text you input. 

Immediately, I thought about all my time playing around with Minecraft title generators, and felt inspired to create a sandbox for users to create their own ASCII titles. I wanted all the focus to be on the customizable text with a hidden menu that would allow tweaks to most aspects of the webpage: ASCII font, background color, text color, text size, etc.

Development wasn't easy however, as plugins were only available in the GUI of chatGPT. My friend and I managed to hack together a workaround with langchain within 5 minutes of the submission deadline! 

I'm very proud of our submission and I had an extremely fun time working together with my friends, but our finished product was... impractical. Langchain is expensive in both computation and time: it would take upwards of 30 seconds (and in extreme cases $.30 0_0) for a user's text to be translated to ASCII.

I decided to take a closer look at Figlet, to see if I could find a way I could give users a seamless ASCII typing experience. I stumbled upon a solution almost exactly like I had envisioned: <a href="http://www.patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20">created by Patorjk</a> (check it out!). Initially, I was surprised someone had already accomplished what I had set out to do, but that quickly turned into relief, knowing that there are others with similar visions and interests as me. I am excited to continue building my vision and will be posting changes here! 
