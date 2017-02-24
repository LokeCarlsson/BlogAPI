# Examination 2

```sh
npm install

npm start
```



## Frågor

##### How have you implemented the idea of HATEOAS in your API? Motivate your choices and how it support the idea of HATEOAS!
Jag har implementerat länkar i svaret på förfrågan som leder vidare användaren till olika förfrågningar. T.ex har jag lagt in så att när användaren skapar en ny post kommer svaret innehålla en länk till posten. Om man kör en get på start adressen så får man länkar för att registrera sig eller logga in.

##### If your solution should implement multiple representations of the resources. How would you do it?
Ifall jag skulle valt att även hantera XML utöver json skulle jag använt mig av något npm paket som hjälper till med parsing av xml.

##### Motivate and defend your authentication solution? Why did you choose the one you did? Pros/Cons.
Jag använde mig av passport och jwt för att låta användaren skapa ett konto och logga in och få en jwt token tilldelats till sig. Denna token skickar användaren med i varje request för att authentisera sig. Jag tyckte detta var en bra lösning som var säker nog för att jag skulle känna mig bekväm att publicera detta live. Dock skulle jag vilja implementera snabbinloggning med t.ex github eller google vilket finns tillgängligt med passport. Det var inte nödvändigt för denna uppgiften så jag skippade det men det är väldigt bra. Jag har insett att jwt är bra sett att authentisera sig mot ett API jämfört med t.ex en API nyckel.

##### Explain how your web hook works.
En användare kan registrera en webhook på mitt API genom att skicka med en url, en eller flera events samt en hemlig sträng som bara användaren bör veta om. Det eventet som användaren skickade med är knytet till en händelse i APIet och kommer triggras och skicka ut en post till den url som användaren skickade med. Den hemliga strängen skickad med i posten så att användaren vet att det är rätt post. Möjligheten finns att registrera flera events i en hook eller att användaren har flera hooks på olika adresser.

##### Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. Write your thoughts down.
Som tidigare nämnt hade det varit trevligt med större möjligtheter vid registrering, att kunna använda github eller google. Jag var nöjd med authentiseringen och jwt så det skulle jag behållt. Nästa gång jag skapar ett API skulle jag troligtvis kolla runt på andra ramverk än express för att bygga ett API då det verkar som att det finns andra lösningar som är mer anpassade för APIer än vad just express är. Det är inget som är omöjligt i express men det känns som att andra lösningar kan erbjuda bättre och smidigare sett att lösa olika saker på. Jag skulle även dela upp projektet i mindre delar och bryta ut det lite mer, för det kändes som jag hade lite för mycket logik i varje fil vilket inte var helt bra. Routingen blev en fil pga. att projektet inte var superstort men det skulle jag även bryta ut i t.ex en ny mapp och ha flera routing filer som tog hand om olika delar för bättre översikt och struktur.  

##### Did you do something extra besides the fundamental requirements? Explain them.
Det jag gjorde med hooks var att tänka på framtiden och redan från börjar lägga upp strukturen så att det skulle vara smidigare att expandera projektet och bygga vidare och lägga till yttligare funktionalitet.
