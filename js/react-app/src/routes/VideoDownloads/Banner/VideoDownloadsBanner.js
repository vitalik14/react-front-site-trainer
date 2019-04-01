import React from 'react';

import styles from './VideoDownloadsBanner.scss';

export default () => (
  <div className={styles.block}>
    <h1 className={styles.title}>
      Videos herunterladen und überall anschauen
    </h1>
    <p className={styles.description}>
      Du möchtest offline trainieren? Oder möchtest pur-life mit in den Urlaub nehmen?
      Kein Problem. Hier kannst Du eine Auswahl unserer besten Kursvideos in voller
      Länge herunterladen.  Hinweis: Sollte das Video im Browser abgespielt werden,
      dann kannst Du das Video über einen Rechtsklick auf den &quot;Herunterladen&quot;
      Knopf speichern. Klicke dort dann einfach auf &quot;Ziel speichern unter&quot;
      bzw. &quot;Link speichern unter&quot;.
    </p>
  </div>
);
