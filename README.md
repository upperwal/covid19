Covid-19 website: https://upperwal.github.io/covid19/

### Multilingual Indian platform for Covid-19.

Reliable and accurate information play a very important role in fighting a crisis like covid-19. This platform aim to bring all resources and people together and deliver useful information to as many Indians as possible.

**When contributing any content, remember:**
1. It should be backed by a trusted organisation/individual like a government body, WHO or a well known medical research institute. 
2. Source of the information should be mentioned at the bottom of the content like

```html
<div className="source">
  <a href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/coronavirus-social-distancing-and-self-quarantine" target="_blank">Johns Hopkins Medicine</a>
</div>
```

3. Please don't cite news channels.

**How you can contribute.**

1. Language translation and vetting: All Indian languages are translated from English using Google translate which isn't accurate. You can either do the same for the languages which are currently not available or if you are familiar with the translated language help us identify the mistakes in translations.
2. Record audio for the following content.

| Resource        | Language           | Status  |
| ------------- |:-------------:| -----:|
| https://youtu.be/1APwq1df6Mw      | English | [x] |
| | Urdu | [] |
| | Hindi | [] |
| | Kannada | [] |
| | Tamil | [] |
| https://youtu.be/2WCtGFNENYU      | English | [x] |
| | Urdu | [] |
| | Hindi | [] |
| | Kannada | [] |
| | Tamil | [] |

3. Build visualisations like https://co.vid19.sg/ for India.

### Adding a new language

Language files reside in [this folder](public/locales). 

* Step 1: Create a new directory inside `public/locales` with prefix `in_<LANGUAGE_CODE>`. `LANGUAGE_CODE` could be anything but it should be relevant. 
* Step 2: Add `translation.json` within the newly created directory and add language translations. (Refer to English or Hindi translation files)
* Step 3: Code for the dropdown to change the language is available in [src/views/header/Header.js](src/views/header/Header.js). You need to add a new option with value `in_<LANGUAGE_CODE>` as shown below:
```html
<option value="in_tam">தமிழ்</option>
```

### Contributing to an existing language

This means that `translation.json` would be available for this language and you can either correct the translations or add new ones.