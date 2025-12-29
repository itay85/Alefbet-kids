// BRAWL LETTERS v5 – 50 questions per letter + no repeats + brawler is a skin (challenge mode)
const ALL_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
const WORD_BANK = {"א":["אֱלִישֶׁבַע","אֶפְּשְׁטֵיין","אֶקְדָּח","אֹן","אֶשְׁכּוֹלִיוֹת","אַצָּה","אַבְרָם","אַחְיָנִית","אֹפֶק","אַנְטִישֵׁמִי","אַחֲרָיוּת","אֶפִּיקוֹרוֹס","אֶרֶץ","אוּזְבֶּקִית","אַשּׁוּר","אוֹטוֹבּוּס","אִימְפֶּרְיָה","אִילָנוֹת","אֱמֻנַת","אֲהוּבָה","אָצֵטוֹן","אַשְׁמָתָהּ","אוֹטוֹקְרַטְיָה","אוֹר","אָחִי","אוֹפּצִיָה","אַמְבְּרוֹסְיָה","אַמְבַּטְיָה","אֶגְרוֹף","אֵקָלִיפְּטוּס","אֵזוֹר","אִבְחָה","אוֹתִיּוֹת","אֲפוּנָה","אַבְשָׁלוֹם","אוֹרִי","אֶלֶף","אֶוִיל","אַשְׁמָתָן","אֱלִיעֶזֶר","אוֹפַנַּיִם","אָלֶכְּסָנְדֶר","אָזֶרְבַּיְיגָ׳ן","אַלִּימוּת","אַלְכִּימְיָה","אַשְׁמָתִי","אֵהוּד","אַלְבּוֹם","אַבָּאיוּדָאיָה","אָלִיגָטוֹר"],"ב":["בּוּשָׁה","בְּחִילָה","בַּלּוּט","בְּלִילָה","בֹּרֶג","בַּקְבּוּק","בְּנֹתָיו","בִּיּוֹמַסָּה","בַּדְלָנוּת","בְּלָמִים","בַּרְקָן","בּוּלְגַּרְיָה","בִּיוֹלוֹג","בְּאֵר","בַּז","בּוֹגוֹטָה","בּוּקָרֶשְׂט","בַּזֶּלֶת","בָּצֵק","בּוֹר","בַּעַר","בְּרָקִים","בִּינַת","בַּגְדַּאדּ","בַּנַּאי","בֵּיצִיָּה","בַּלָּשׁ","בְּדִיחוֹת","בֵיתֵנוּ","בַּהַט","בַּעֲטָן","בַּרְוָזוֹן","בּוֹטָנִיקָה","בְּטִיחוּת","בָּטָרִיָּה","בִּטּוּי","בּוּסָה","בּוֹיְדֶם","בְּחִירָה","בְּרִיאָה","בְּקָרִים","בְּעָתָה","בָּגָ״ץ","בְּדִיחָה","בַּרְמֶן","בּוֹחֵן","בַּגְרוּת","בַּנְק","בִּיסְקְוִיט","בֶּרְלִין"],"ג":["גַּמֶּדֶת","גֶּרְמַנְיוּם","גִּנּוּן","גְּבַרְתָּן","גִּיחוֹן","גַּבְרִי","גַּרְעִינִים","גֹּלֶם","גָּאנָה","גֶּזַע","גָּרוֹן","גִּזְבָּר","גֵּרְשֹׁם","גָּאן","גִּיל","גֶ׳נוֹסַיְד","גַּנָּב","גּוֹי","גְּלִידַת","גְּרִיסָה","גּוּף","גֻּלְגֹּלֶת","גַּבָּה","גִּירְסָה","גִּימֶ״ל","גִירִים","גַּלְגַּלִּים","גירות","גְּבָרִים","גֻּמָּה","גְּדֵרָה","גְּאֻלָּה","גָּמָל","גִיוֹרֶת","גִ׳ינְס","גֵּאוֹמֶטְרְיָה","גְּאוֹנִים","גְּבַל","גֶ׳ז","גֶּדֶם","גַּפְרוּר","גַּת","גֶּלֶד","גַּלָּח","גּוֹלְף","גִּזְעָנוּת","גִּיסָה","גֻּשְׁפַּנְקָה","גַּמָּד","גְּנוֹסִיס"],"ד":["דַּחְפּוֹר","דִּיקְטָטוּרָה","דִּיפְּלוֹמַטְיָה","דִּכּוּי","דַּמֶּשֶׂק","דִּירָה","דְּבוֹרָה","דֹּר","דַּרְכּוֹנִים","דּוֹלְפִין","דֵּיאוֹדוֹרַנְט","דְּבֵלָה","דָּגִים","דַּפִּים","דּוֹבֵר","דְּמוּת","דֶּלֶק","דְּלִי","דֹּאַר","דְּיוֹ","דַּעַת","דְּבָרְךָ","דִּילְדוֹ","דִּבְרֵי","דַּיָּה","דֶּמֶה","דּוֹרוֹן","דֹּב","דַּפְנָה","דּוּגְמָא","דְּרָקוֹן","דַּיָּר","דִּיסְקוֹטֶקִים","דּוֹחַה","דָּרוֹם","דַּקָּה","דֵּפִיבְּרִילָטוֹר","דְּבִיבוֹן","דָּגֵשׁ","דָּמִים","דַּוָּר","דִּכְדּוּךְ","דֶּנְדְּרוֹכְּרוֹנוֹלוֹגְיָה","דָּם","דָּנִיֵּאל","דַּקָּר","דַּיְסָה","דַּיָּן","דְּלֵקָה","דָּרְבָּן"],"ה":["הֶדוֹנִיזְם","הַשְׁקָעָה","הוֹמוֹ","הִתְנַגְּדוּת","הַאם","הֶסְבֵּר","הַסְלָמָה","הַלְוָאָה","הוֹלַנְד","הַסְבָּרָה","הוּנְגַּרְיָה","הֲגָבָה","הֶרְצְלִיָּה","הֲפֵכָה","הַגָּדָה","הֲרָרִים","הִתְיָעֲצוּת","הֲנָחָה","הַמְצָאָה","הִתְיַקְּרוּת","הַגָּעָה","הָפוּךְ","הַצָּלָה","הַתְחָלוֹת","הַתְפָּלָה","הִתְלַהֲבוּת","הַפִּירָמִידָה","הַתְקָנָה","הַגְבָּלָה","הִיסְטוֹרְיוֹגְרַפְיָה","הֵ״א","הֶרְגֵּל","הַמְרָאָה","הַרְשָׁמָה","הַשְׂכָּרָה","הֶבֶל","הַגָּשָׁה","הוֹלַנְדִּי","הַעֲסָקָה","הַשְׁתָּנָה","הֵא","הִשְׁתַּכְּנְזוּת","הַב","הִתְבַּגְּרוּת","הֶל","הָרֵי","הַדָּבָר","הֲקָמָה","הַכָּרָה","הַקְפָּאָה"],"ו":["וִיקִי","וּלְקָן","וָפֶל","וָו","וִילוֹן","וָאט","וֶקְטוֹר","ווֹדְקָה","וַיִּקְרָא","וָנִיל","וְיֶנְטְיָאן","וִיטָמִין","וֵטוֹ","וַעַד","ווּסווּסִים","וִילָה","וַדַּאי","וַרְיַאצְיָה","וָפְל","וַרְשָׁה","וֶנְטִילָטוֹר","ווֹלְט","וִיקִיפֶּדְיָה","וֶלִינְגְּטוֹן","ווּדוּ","וֶטֶרִינָר","וִינָה","וִילְנָה","וִדּוּי","וְרָדִים","וַקְס","וֶרֶד","וָלָד","וֶסְט","וַעֲדָה","וֶסֶת","וִידֵאוֹ","וֶנוּס","וְרִיד","וִיקִיפֶּדְיוֹת","ווֹק","וִיסְקִי","וִירוּס","וָזָה","וִיקִינְג","וִיקִימִילּוֹנִים","וִכּוּחַ","וָאט","וָ״ו","וֶנֶצְיָה"],"ז":["זָכָר","זוֹרְמִיּוּת","זַיִת","זִקְנָה","זוֹב","זִכְרִי","זִיעַ","זוּג","זִיו","זְבוּבִים","זוֹרֵם","זֶרַע","זִקָּה","זַיִן","זְכַרְיָה","זְנוּת","זְמַנִּים","זָקָן","זֶבְּרָה","זִהוּם","זִקּוּק","זַגָּג","זָר","זֶרֶם","זוֹחֵל","זְהִירוּת","זִכָּרוֹן","זְבוּב","זִלְפָּה","זוּלָת","זֹהַר","זְמַנֵּי","זָקִיף","זְמַן","זְרוֹעַ","זוֹמְבִּי","זְגוּגִית","זִיּוּף","זוֹאוֹלוֹגְיָה","זַן","זַחַל","זַמָּר","זַ׳רְגוֹן","זִיּוּן","זַעֲזוּעַ","זִקִּית","זֶרַח","זָוִית","זָמִיר","זְנָבוֹ"],"ח":["חַמְצָן","חֶרֶק","חַרְטוֹם","חוֹף","חוֹמָה","חָצֵר","חֲגִיגָה","חָדָשׁ","חִרְחוּר","חָכָם","חִגָ׳אבּ","חֹמֶט","חִוָּרוֹן","חַלְחֹלֶת","חַזַּאי","חִוּוּט","חַבַּדְנִיק","חִדֶּקֶל","חַאג׳","חִיּוּךְ","חִנּוּךְ","חֲנֻכִּיּוֹת","חִלּוּן","חֵךְ","חֻקִּים","חָצָב","חִבּוּק","חַלְוָה","חָתָן","חֹטֶם","חֲלָבִים","חֻקָּה","חֲבִיתָה","חָרָא","חָבִית","חוֹב","חֻלְצָה","חַזָּן","חָבִיב","חֲקִירָה","חֶבֶל","חֲרָקִים","חַמְסָה","חֲתוּלִים","חֲלָלִית","חֲדָשׁוֹת","חֲדָשָׁה","חוּשׁ","חֲתַלְתּוּל","חֻרְשָׁף"],"ט":["טִבְעוֹנוּת","טְיוּטָה","טִיטַנְיוּם","טֵית","טִירוֹן","טָרָארָאם","טֶלֶוִיזְיָה","טְרַנְסְקְרִיפְּצְיָה","טוּנְגְּסְטֶן","טוֹב","טוֹן","טוּרְקִית","טִיטוּס","טִגּוּן","טֵרוּף","טֶהֱרָאן","טָעֻיּוֹת","טוּרְקְיָה","טֶלֶנוֹבֶלָה","טִיפּ","טֻגָּן","טֶרֶף","טֶקֶס","טְלַאי","טֶסְט","טִיפּוּס","טִיב","טַבַּעַת","טוֹרְסוֹ","טִפּוּל","טֶקְסְט","טִיּוּל","טַוָּס","טֶרוֹרִיסְט","טִפּוּס","טֶלֶוִיזְיוֹת","טַפֵּנָד","טוּרְקִיז","טְרָפֶּז","טְרוֹל","טֶכְנוֹלוֹגְיָה","טֶרוֹר","טִפֵּשׁ","טוֹקְיוֹ","טוּשׁ","טָעָן","טוֹפּוֹלוֹגְיָה","טֵלֶסְקוֹפִּים","טְלָאִים","טִפָּה"],"י":["יָדוֹ","יְאוֹר","יְהוֹשֻׁעַ","יְשִׁיבוֹת","יָזְמָה","יְחֶזְקֵאל","יְוָנִית","יְהוּדִי","יְהוּדִית","יָנוּאָר","יֹשְׁבֵי","יָדִיד","יַכְטָה","יָדֶיךָ","יְרִידָה","יוֹשְׁבֵי","יוֹ״ד","יוֹרֶדֶת","יָצוּעַ","יַבָּשָׁה","יוֹשֵׁב","יְבוּל","יַעַר","יְחִידָה","יַלְדוּת","יוּזֶר","יִידִישׁ","יָהּ","יִשָּׂשכָר","יְבָמָה","יַהֲדוּת","יַנְקוּת","יושרה","יָפוֹ","יִשְׂרְאֵלִי","יַתּוּשׁ","יְרִיחוֹ","יְלָדִים","יַלְדֵי","יֵשׁ","יוֹשְׁבִים","יֶלֶד","יָעֶה","יוֹעֵץ","יַהֲלוֹם","יִשּׂוּמוֹן","יְרוּשַׁלְמִי","יוֹנֵק","יָתוֹם","יַרְגָּזִי"],"כ":["כֶּסֶף","כְּסִיל","כֻּפְתָּה","כַּבָּאִית","כַּדּוּרַגְלָן","כְּנֵסִיָּה","כִּרְכּוּם","כָּבֵד","כִּידוֹן","כְּלַבְלַב","כִּסּוּפִים","כּוֹהֵן","כַּמָּת","כְּאֵב","כְּרוֹם","כַּהֲנִיסְט","כֵּיף","כְּתָב","כַּלְבָּה","כֵּרְוָן","כַּדּוּרְסַל","כִּוּוּן","כַּתָּבָה","כּוֹכָבִית","כְּפִיָּה","כְּפָפָה","כֹּרַח","כָּרִיךְ","כֶּבֶשׂ","כְּהֻנָּה","כַּסְפִּית","כיסא","כָּנָף","כְּלוּב","כִּסֵּא","כַּוֶּרֶת","כֵּפֶל","כַּן","כְּתִיב","כַּשְׂדִּי","כַּסֶּפֶת","כּוּסְכּוּס","כנסייות","כַּמּוֹן","כְּרַךְ","כֹּחַ","כּוֹנָן","כַּדּוּר","כִּנֶּרֶת","כּוּרְכּוּם"],"ל":["לוּלָב","לַוְיָין","לֵיְזֶר","לוֹנְדּוֹן","לְבִיאָה","לַהַק","לווייתן","לָבִיא","לְבָנָה","לֶחֶם","לִוְיָתָן","לוּחוֹת","לְאֹם","לִיטָאִית","לְבוּשׁ","לְיוּבְּלְיָאנָה","לְאֻמִּיּוּת","לַקְטוֹז","לֵילוֹת","לִיבִּידוֹ","לֵאָה","לָמָּה","לָבָן","לָמֶ״ד","לָשׁוֹן","לוֹגוֹ","לֶבֶד","לִכְלוּךְ","לַנְתָּן","לְטָאָה","לִיסְבּוֹן","לֶתֶת","לְבֵנִים","לִילִית","לִּכּוּד","לֵב","לַק","לְשׁוֹנוֹת","לַחוּת","לִבּוֹ","לַחְמָנִיָּה","לוֹבִּי","לֶבַנְט","לֹטֶם","לִקּוּי","לֵוִי","לַעַז","לִכּוּדְנִיק","לֶסֶת","לוֹעֲזִית"],"מ":["מָרָא","מִגְרָשׁ","מַנְדָּרִינִית","מְתַרְגֵּם","מִשְׁלוֹחַ","מְעוֹרָבוּת","מְכוֹנָה","מַדְרִיד","מִדְרוֹן","מְעִיל","מִגְלָשׁ","מְתֻמָּן","מַאֲהָל","מִתּוּן","מֵיטָב","מַקְצוּעָה","מִרְיָם","מִטְרִיָּה","מַטְקָה","מְצוּלָה","מָנֶה","מַעֲרוֹךְ","מִגְבַּעַת","מְחִיקָה","מִמְשָׁק","מִצְוָה","מִטְבָּחִים","מַזְכֶּרֶת","מַכְבֵּשׁ","מוּגְלְגִים","מלצרים","מִרְקָם","מָרוֹר","מַלְבֵּן","מִטְמָנָה","מֶרְכָּב","מַאֲמָץ","מֶלְקַחַת","מִשְׁכָּן","מַגֵּפָה","מִלָּה","מַחְסוֹר","מָוֶת","מִפְלָגָה","מַעְגָּל","מַרְכִּיב","מָסוֹרָה","מַאי","מוֹדֶם","מוֹנוֹתֵאִיזְם"],"נ":["נָאקָה","נְחֹשֶׁת","נָתָן","נִרְצָח","נְצִיב","נִסִּים","נַגְלָה","נֹעַם","נֶגֶב","נַחַ״ל","נַקְנִיקִיָּה","נְקֵבָה","נְדוּנְיָה","נִמְרוֹד","נְהִיגָה","נֵזֶר","נוּן","נָשִׁים","נָאצִי","נְסִיכָה","נֵר","נַרְתִּיקִים","נְבִיאִים","נְתַנְיָהוּ","נוֹשֵׂא","נְבֵלָה","נוֹזֵל","נִצָּב","נַגָּר","נֶפּוֹטִיזְם","נְשִׁיקָה","נָעֳמִי","נַרְגִּילָה","נַגָּד","נוֹגְדָן","נַדְלָ״ן","נוֹצְרִי","נִשּׂוּאִין","נֵכָר","נְקֻדָּה","נִסָּיוֹן","נוֹיְרוֹכִירוּרְגְּיָה","נַנָּס","נַחוּם","נַהָג","נָהָר","נִדַּת","נוֹשֶׁה","נְסִיעָה","נַחַל"],"ס":["סַחַף","סְלֶנְג","סְפוֹג","סִדְרַת","סוֹחֵר","סָדִין","סְבָרָה","סֶלַע","סַמְכוּת","סֶרֶט","סוֹפָ״שׁ","סְבִיבָה","סַרְגֵּל","סִפּוּחַ","סַנְטֵר","סֶתֶם","סְטֶנְדְּאָפּ","סִכּוּן","סִיעָה","סוּרְיָה","סָב","סְלוׄבֶנְיָה","סַבּוֹן","סִיגָר","סִיּוּט","סִרְטוֹן","סְפָרַדִּי","סֻכָּרִיָּה","סַדְנָה","סְטִירָה","סַרְטָן","ספרייה","סַגְסֹגֶת","סֻלָּמוֹת","סְלִיק","סוֹלְקָן","סֶנְט","סֶרֶן","סוּסָה","סְבִיבוֹן","סְפָרִים","סְתָו","סַכּוּ״ם","סַבָּא","סוֹכֵךְ","סֻפְגָּנִית","סְנִיף","סְלוֹבַקְיָה","סְתָ״ם","סוּפָה"],"ע":["עַקְרַבִּים","עַגְבָנִיּוֹת","עָשׁ","עִצּוּב","עוֹר","עָלָיו","עָמִית","עַכּוּז","עָמוֹס","עֹקֶץ","עַכּוּ״ם","עֲלִיָּה","עָקֵב","עֲרָבִי","עֵצִים","עִירִיָּה","עוֹלָם","עֲדִיפוּיוֹת","עֵרוּב","עֲנָבָה","עֵינַיִם","עִכּוּל","עַכְבָּר","עִבְרוּת","עֲבֵרָה","עֲלָטָה","עֹרֵב","עוֹבַדְיָה","עָרוּץ","עִמָּנוּאֵל","עֶלְיוֹנוּת","עָשׂוֹר","עַמִּים","עַמּוֹ","עַמְבָּה","עַקְרָב","עִיר","עֲרָבוֹת","עַם","עַד","עֹנֶשׁ","עֲקִימָה","עַפְעַף","עֲתִירָה","עִתּוֹנַאי","עַגְבָנִיָּה","עֹמֶס","עֲלוּקָה","עֵצָה","עַמְרָם"],"פ":["פֶּתַח","פַּרְצוּפִים","פּוֹגְרוֹם","פַּרְבָּר","פְּסַנְתֵּרִים","פּוֹלָנִית","פָּרִיז","פַּרְדֵּ״ס","פְּסִיק","פוֹטוֹן","פִּשְׁפֵּשׁ","פְרִיזוּרָה","פִּילֶגֶשׁ","פִּירָמִידָה","פֶּרִיגֵיאָה","פּוּלֶט","פְלוׄגִיסְטוׄן","פָּרָדִיגְמָה","פֶּרֶד","פַּרְהֶסְיָה","פָּן","פֶּלֶא","פְּלִישָׁה","פַּעֲמוֹנִים","פָּשׁוֹשׁ","פְּרָטֵי","פָּפִּירוּס","פַּרְסָה","פִּלְפְּלים","פְּרָחִים","פִּיו","פֶּתֶק","פּוֹרֵץ","פּוֹדִיאָטֶר","פִּיל","פָּעִיל","פֶּשַׁע","פִּטְמָה","פֶמִינִיזְם","פוּנְקְצִיָּה","פּוֹפָּאי","פָּרָבּוֹלָה","פֶּרַח","פְּרִי","פַּרְלָמֶנְט","פְּסֵיפָס","פִיזְיוֹלוֹגְיָה","פְּצִירָה","פצים","פִּיּוּט"],"צ":["צְדָקָה","צִיּוּנִים","צֶלֶם","צִבּוּר","צַיְתָנוּת","צְפַת","צִלְצוּלִים","צְפוּעַ","צמיגים","צְרָצַר","צִיקָדָה","צֶדֶק","צַלַּחַת","צְלָפְחָד","צֶ׳ק","צוּנָאמִי","צִיּוֹנוּת","צִלּוּם","צִירִיךְ","צִפּוֹר","צוּף","צְמִיג","צֶמַח","צָהֳרַיִם","צֹר","צָרְפָתִית","צִמּוּק","צַיֶּדֶת","צְבָעִים","צַלְמִית","צַנְעָא","צְמַרְמֹרֶת","צוֹלֶלֶת","צָרִים","צִיצִיּוֹת","צ׳וּפְּצִ׳יק","צִפֹּרָה","צִי","צֶפַע","צִוּוּת","צַו","צִידוֹן","צִמְחוֹנוּת","צוֹעֲנִי","צֹרֶךְ","צִרְעָה","צְדָקִים","צֵלׇע","צֹמֶת","צִפֹּרֶן"],"ק":["קָצֶה","קְלָף","קְרוֹבָה","קוֹרֵיאָנִי","קְשִׁישָׁא","קְרִיפְּטוֹן","קוֹץ","קוֹרֵא","קָפֶה","קוֹד","קַנְיוֹן","קִנּוּחַ","קִיר","קֶטַע","קֶשֶׁת","קֹבֶץ","קְדֻשָּׁה","קְלִפָּה","קַרְקַע","קְצִיצוֹת","קוֹנְגְּרֶס","קוּמְזִיצִים","קוֹאָלָה","קָטָלוּנְיָה","קֵיצִים","קֹלְךָ","קִטְנִית","קוֹקְסִינֶל","קוֹלָן","קַנְבֶּרָה","קְרֶדִיט","קֶטֶל","קַנְטִינָה","קוֹנְסֶרְבָטִיבִי","קְצִיצָה","קֵץ","קַלּוּת","קְעָרוֹת","קֶמַח","קֹלוֹ","קָשִׁישׁ","קְהִלָּה","קְבוּרָה","קִנָּמוֹן","קוֹנְדּוֹם","קָזַבְּלַנְקָה","קָדֵשׁ","קָדְקוֹד","קְטִיפָה","קְלִיפָה"],"ר":["רִמּוֹנִים","רְחוֹבוֹת","רַעַם","רֵיחַ","רְשִׁימוֹת","רַוָּקה","רוֹם","רוּחַ","רֶגֶשׁ","רֹאשָׁן","רֹחַב","רָשָׁע","רַבְשָׁקֵה","רִבּוֹנִי","רִשּׁוּת","רִשָּׁיוֹן","רַגְלָיו","רָצוֹן","רַפְסוֹדָה","רוּת","רָאשֵׁי","רייבנקלו","רְסִיס","רֶטֶט","רִבְעוֹן","רְטִיבוּת","רוך","רֹעִי","רַב","רֹתֶם","רֹק","רַעַל","רוּסִית","רִהוּט","רֵעֲךָ","רוֹמָנִית","רְהִיטוּת","רווק","רָאקוּנִיִּים","רְוָיָה","רַקְדָנִית","רְאָיָה","רַשְׁבִּ״י","רְגָשׁוֹת","רָפֶה","ריהוט","רוּסִי","רֶפֶת","רַמְזוֹר","רַע"],"ש":["שְׁקָרִים","שַׁחְמָט","שׁוֹפֵט","שְׂדֵרָה","שְׁמִירָה","שַׁלְהֶבֶת","שַׂלְמָה","שׁוֹט","שֶׁלֶט","שְׁלִישׁ","שִׁתּוּף","שְׁקָלִים","שָׁבוּעוֹת","שִׁירָה","שַׁבָּתוֹת","שִׁמְשָׁה","שְׁפִיכָה","שָׂרִיד","שׁוּק","שׁוֹפְטֵי","שִׁקְרֵי","שְׁרִיקָה","שֵׁת","שֶׁלַח","שְׁרִיר","שִׁבֹּלֶת","שְׁמוּרָה","שִׁרְשׁוּר","שַׁנַּאי","שׁוּרוֹת","שְׁבוּעָה","שַׁמָּה","שֵׁמוֹת","שְׁעוּעִית","שָׁלוֹם","שִׂיחָה","שְׁוֶדְיָה","שַׁחֶפֶת","שַׁגְרִירוּת","שָׂרָף","שֹׁנִי","שְׁבִיתָה","שִׁחְרוּרוֹ","שְׁפּוֹנְדְרָה","שִׁעֲמוּם","שִׁינְקֶן","שָׂדֶה","שְׁמוֹ","שְׁלָבִּים","שׁוֹקוֹלָד"],"ת":["תַּחְבּוּלָה","תְּלוּנָה","תְּכוּלָה","תֹּם","תְּהִלִּים","תִּיק","תַּקְצִיב","תּוּתִים","תּוֹבֵעַ","תַּשְׁלִיךְ","תַּפּוּחֵי","תַּשְׁבֵּץ","תְּמוּנָה","תַּבְשִׁיל","תּוֹפָעָה","תיחום","תְּפִירָה","תַּחְבֹּשֶׁת","תִּינוֹק","תֵּבֵל","תֹּרֶן","תַּפּוּחַ","תַּשְׁדִּיר","תַּחֲנַת","תּוֹרוֹת","תִּנְשֶׁמֶת","תִּיקָן","תַּעֲסוּקָה","תְּרִיס","תַּקְדִּים","תַּרְנְהוֹד","תֵּמַהּ","תְּמִיכָה","תְּאוּצָה","תַּלְמוּד","תָּוֶךְ","תָּוִית","תּוּתֵי","תִּסְרֹקֶת","תּוֹרָה","תַּפּוּחִים","תִּפְאֶרֶת","תְּשׁוּקָה","תְּשׂוּאוֹת","תְּחוּם","תַּקְלִיטוֹר","תְּבוּסָה","תּוֹדָעָה","תַּלְיוּם","תְּרֵיסָר"]};
const KEY_SETTINGS = "brawl_letters_settings_v5";

const SPECIAL_BRAWLERS = {
  "ס": { name:"ספידי", desc:"רץ מהר ויורה סוכריות", img:"assets/brawlers/speedy.svg" },
  "כ": { name:"כדורי", desc:"זורק כדורים זהובים", img:"assets/brawlers/kadori.svg" },
  "ר": { name:"רובו", desc:"לייזר מטורף!", img:"assets/brawlers/robo.svg" },
  "ט": { name:"טורנדו", desc:"מערבולת על-קולית", img:"assets/brawlers/tornado.svg" },
};

const els = {
  home: document.getElementById("screenHome"),
  select: document.getElementById("screenSelect"),
  fight: document.getElementById("screenFight"),

  btnParentToggle: document.getElementById("btnParentToggle"),
  lettersDialog: document.getElementById("lettersDialog"),
  btnCloseLetters: document.getElementById("btnCloseLetters"),

  btnSound: document.getElementById("btnSound"),
  btnSettings: document.getElementById("btnSettings"),

  btnPlay: document.getElementById("btnPlay"),
  btnOpenBrawlers: document.getElementById("btnOpenBrawlers"),
  homeLettersHint: document.getElementById("homeLettersHint"),
  coinsTotal: document.getElementById("coinsTotal"),
  starsTotal: document.getElementById("starsTotal"),
  streak: document.getElementById("streak"),

  lettersGrid: document.getElementById("lettersGrid"),
  btnPickAll: document.getElementById("btnPickAll"),
  btnPickNone: document.getElementById("btnPickNone"),
  btnPresetNadav: document.getElementById("btnPresetNadav"),
  pickedCount: document.getElementById("pickedCount"),

  brawlers: document.getElementById("brawlers"),
  selectHint: document.getElementById("selectHint"),
  modePill: document.getElementById("modePill"),

  currentBrawlerPill: document.getElementById("currentBrawlerPill"),
  coinsHud: document.getElementById("coinsHud"),
  starsRound: document.getElementById("starsRound"),
  wordMasked: document.getElementById("wordMasked"),
  btnReveal: document.getElementById("btnReveal"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),

  reward: document.getElementById("reward"),
  btnStar: document.getElementById("btnStar"),
  rewardText: document.getElementById("rewardText"),
  coinsPop: document.getElementById("coinsPop"),

  btnTryAgain: document.getElementById("btnTryAgain"),
  btnChangeBrawler: document.getElementById("btnChangeBrawler"),

  dialog: document.getElementById("settingsDialog"),
  autospeakSelect: document.getElementById("autospeakSelect"),
  rateInput: document.getElementById("rateInput"),
  btnSaveSettings: document.getElementById("btnSaveSettings"),

  winDialog: document.getElementById("winDialog"),
  btnKeepPlaying: document.getElementById("btnKeepPlaying"),
  btnResetCoins: document.getElementById("btnResetCoins"),
};

const state = {
  lettersMode: "all",
  selectedLetters: [...ALL_LETTERS],

  autospeak: true,
  rate: 0.95,

  coins: 0,
  starsTotal: 0,
  streak: 0,

  chosenBrawlerLetter: null, // skin choice only

  currentWord: "",
  currentFirstLetter: "",
  revealed: false,
  locked: false,
  rewardClaimed: false,
  roundStars: 0,
  wrongAttemptsThisWord: 0,

  // non-repeat queues per letter
  queues: {}, // { "א": [word,word,...] }
};

function randInt(n){ return Math.floor(Math.random()*n); }
function pick(arr){ return arr[randInt(arr.length)]; }
function shuffle(a){
  const arr = a.slice();
  for(let i=arr.length-1;i>0;i--){ const j=randInt(i+1); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}

function speak(text){
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "he-IL";
    u.rate = state.rate;
    window.speechSynthesis.speak(u);
  }catch(_){}
}

function save(){
  localStorage.setItem(KEY_SETTINGS, JSON.stringify({
    lettersMode: state.lettersMode,
    selectedLetters: state.lettersMode === "custom" ? state.selectedLetters : [],
    autospeak: state.autospeak,
    rate: state.rate,
    coins: state.coins,
    starsTotal: state.starsTotal,
    streak: state.streak,
    chosenBrawlerLetter: state.chosenBrawlerLetter
  }));
}

function load(){
  try{
    const raw = localStorage.getItem(KEY_SETTINGS);
    if(!raw) return;
    const s = JSON.parse(raw);
    if(typeof s.autospeak === "boolean") state.autospeak = s.autospeak;
    if(typeof s.rate === "number") state.rate = s.rate;

    if(s.lettersMode === "custom" && Array.isArray(s.selectedLetters) && s.selectedLetters.length){
      state.lettersMode = "custom";
      state.selectedLetters = s.selectedLetters.filter(x => ALL_LETTERS.includes(x));
      if(!state.selectedLetters.length) state.selectedLetters = [...ALL_LETTERS];
    } else {
      state.lettersMode = "all";
      state.selectedLetters = [...ALL_LETTERS];
    }

    if(typeof s.coins === "number") state.coins = s.coins;
    if(typeof s.starsTotal === "number") state.starsTotal = s.starsTotal;
    if(typeof s.streak === "number") state.streak = s.streak;
    if(typeof s.chosenBrawlerLetter === "string") state.chosenBrawlerLetter = s.chosenBrawlerLetter;
  }catch(_){}
}

function setUI(){
  els.coinsTotal.textContent = String(state.coins);
  els.coinsHud.textContent = String(state.coins);
  els.starsTotal.textContent = String(state.starsTotal);
  els.streak.textContent = String(state.streak);
  els.autospeakSelect.value = state.autospeak ? "on" : "off";
  els.rateInput.value = String(state.rate);

  els.homeLettersHint.textContent =
    (state.lettersMode === "all") ? "מצב אותיות: כל האותיות (א–ת)" : `מצב אותיות: פוקוס על (${state.selectedLetters.join(" ")})`;

  if(state.chosenBrawlerLetter){
    const b = brawlerForLetter(state.chosenBrawlerLetter);
    els.currentBrawlerPill.textContent = `בראולר: ${b.name}`;
  } else {
    els.currentBrawlerPill.textContent = "בחר בראולר";
  }
}

function show(screen){ [els.home, els.select, els.fight].forEach(s => s.hidden=true); screen.hidden=false; }

// Letters dialog
function buildPicker(){
  els.lettersGrid.innerHTML = "";
  const selected = new Set(state.lettersMode === "custom" ? state.selectedLetters : ALL_LETTERS);

  ALL_LETTERS.forEach(letter => {
    const d = document.createElement("div");
    d.className = "letterChip" + (selected.has(letter) ? " selected" : "");
    d.textContent = letter;
    d.addEventListener("click", () => {
      state.lettersMode = "custom";
      const set = new Set(state.selectedLetters);
      if(set.has(letter)) { set.delete(letter); d.classList.remove("selected"); }
      else { set.add(letter); d.classList.add("selected"); }
      state.selectedLetters = Array.from(set).filter(x => ALL_LETTERS.includes(x));
      updatePickedCount();
      // reset queues when changing focus so you get fresh no-repeat behavior
      state.queues = {};
    });
    els.lettersGrid.appendChild(d);
  });

  if(state.lettersMode === "all") state.selectedLetters = [...ALL_LETTERS];
  updatePickedCount();
}

function updatePickedCount(){
  els.pickedCount.textContent = (state.selectedLetters.length === 0)
    ? "בחר לפחות אות אחת"
    : `נבחרו: ${state.selectedLetters.length} אותיות`;
}

function normalizeLettersMode(){
  if(state.selectedLetters.length === 0) state.selectedLetters = ["א"];
  const set = new Set(state.selectedLetters);
  state.lettersMode = (set.size === ALL_LETTERS.length) ? "all" : "custom";
  if(state.lettersMode === "all") state.selectedLetters = [...ALL_LETTERS];
}

function openLetters(){ buildPicker(); try{ els.lettersDialog.showModal(); }catch(_ ){} }
function closeLetters(){ normalizeLettersMode(); save(); setUI(); try{ els.lettersDialog.close(); }catch(_ ){} }
function toggleLetters(){ if(els.lettersDialog.open) closeLetters(); else openLetters(); }

function pickerSelectAll(){ state.lettersMode="all"; state.selectedLetters=[...ALL_LETTERS]; state.queues={}; buildPicker(); }
function pickerSelectNone(){ state.lettersMode="custom"; state.selectedLetters=[]; state.queues={}; buildPicker(); }
function pickerPresetNadav(){ state.lettersMode="custom"; state.selectedLetters=["ס","כ","ר","ט"]; state.queues={}; buildPicker(); }

// Brawlers (skin)
function brawlerForLetter(letter){
  if(SPECIAL_BRAWLERS[letter]) return SPECIAL_BRAWLERS[letter];
  return { name: `בוט-${letter}`, desc: `דמות מיוחדת`, img: `assets/brawlers/letter-${letter}.svg` };
}

function buildBrawlers(){
  els.brawlers.innerHTML = "";
  // show 4 random skins to pick from (letters, but doesn't lock the quiz)
  const pool = (state.lettersMode === "custom") ? state.selectedLetters.slice() : ALL_LETTERS.slice();
  const letters = shuffle(pool).slice(0,4);

  letters.forEach(letter => {
    const b = brawlerForLetter(letter);
    const card = document.createElement("div");
    card.className = "brawler";
    card.innerHTML = `
      <div class="bLeft">
        <img class="bAvatarImg" src="${b.img}" alt="${b.name}">
        <div class="bText">
          <div class="bName">${b.name}</div>
          <div class="bDesc">דמות בלבד – השאלות משתנות בכל פעם</div>
        </div>
      </div>
      <div class="bRight">${letter}</div>
    `;
    card.addEventListener("click", () => chooseBrawler(letter));
    els.brawlers.appendChild(card);
  });

  els.modePill.textContent = (state.lettersMode === "custom") ? "פוקוס" : "רנדומלי";
  els.selectHint.textContent = "הבראולר הוא דמות/סקין. בכל שאלה המילה תתחיל באות אחרת – צריך לחשוב 🙂";
}

function openBrawlers(){ buildBrawlers(); show(els.select); }

function chooseBrawler(letter){
  state.chosenBrawlerLetter = letter;
  save();
  setUI();
  startNewQuestion();
}

// Niqqud-safe masking
const COMBINING = /[\u0591-\u05C7]/;
function splitFirstCluster(word){
  if(!word) return ["",""];
  let i=1;
  while(i<word.length && COMBINING.test(word[i])) i++;
  return [word.slice(0,i), word.slice(i)];
}
function maskFirstLetter(word){ const [, rest] = splitFirstCluster(word); return "_" + rest; }

// Non-repeat picker per letter
function getQueue(letter){
  if(!state.queues[letter] || state.queues[letter].length === 0){
    const arr = WORD_BANK[letter] ? WORD_BANK[letter].slice() : [];
    state.queues[letter] = shuffle(arr);
  }
  return state.queues[letter];
}

function pickWord(){
  const allowedLetters = (state.lettersMode === "custom") ? state.selectedLetters.slice() : ALL_LETTERS.slice();
  const letter = pick(allowedLetters);
  const q = getQueue(letter).pop();
  return q || (letter + "...");
}

function buildChoices(correctLetter){
  const basePool = (state.lettersMode === "custom") ? state.selectedLetters : ALL_LETTERS;
  const choices = new Set([correctLetter]);
  while(choices.size < 4) choices.add(pick(basePool));
  return shuffle(Array.from(choices));
}

function resetRoundUI(){
  els.feedback.textContent = "";
  els.starsRound.textContent = "0";

  els.reward.hidden = true;
  els.btnStar.disabled = true;
  els.coinsPop.hidden = true;

  els.btnTryAgain.hidden = true;

  state.roundStars = 0;
  state.revealed = false;
  state.locked = false;
  state.rewardClaimed = false;
  state.wrongAttemptsThisWord = 0;

  els.btnReveal.textContent = "👀 גלה אות";
}

function startNewQuestion(){
  if(!state.chosenBrawlerLetter) return openBrawlers();

  resetRoundUI();
  const w = pickWord();
  state.currentWord = w;
  state.currentFirstLetter = w[0];

  els.wordMasked.textContent = maskFirstLetter(w);

  els.choices.innerHTML = "";
  els.choices.classList.add("arena");
  buildChoices(state.currentFirstLetter).forEach(letter => {
    const c = document.createElement("div");
    c.className = "choiceCard";
    const br = brawlerForLetter(letter);
    c.innerHTML = `
      <div class="choiceLeft">
        <div class="choiceAvatar"><img src="${br.img}" alt="${br.name}"></div>
        <div>
          <div class="choiceName">${br.name}</div>
          <div class="choiceHint">בחר את הבראולר שמתחיל באות הנכונה</div>
        </div>
      </div>
      <div class="choiceLetter">${letter}</div>
    `;
    c.addEventListener("click", () => answer(letter, c));
    els.choices.appendChild(c);
  });

  show(els.fight);
  if(state.autospeak) setTimeout(() => speak(w), 120);
}

function revealFirstLetter(){
  if(state.revealed) return;
  state.revealed = true;
  els.wordMasked.textContent = state.currentWord;
  els.btnReveal.textContent = "🙈 הסתר";
}
function hideFirstLetter(){
  state.revealed = false;
  els.wordMasked.textContent = maskFirstLetter(state.currentWord);
  els.btnReveal.textContent = "👀 גלה אות";
}

// Answers
function answer(letter, btn){
  if(state.locked) return;

  if(letter === state.currentFirstLetter){
    btn.classList.add("correct");
    state.roundStars += 1;
    state.starsTotal += 1;
    state.streak += 1;

    els.starsRound.textContent = String(state.roundStars);
    els.feedback.textContent = "💥 ניצחת בזירה! לחץ על ⭐ כדי לקבל מטבעות 🪙";
    if(state.autospeak) speak(state.currentWord);

    state.locked = true;
    Array.from(els.choices.querySelectorAll(".choiceCard")).forEach(b => b.classList.add("disabled"));

    els.reward.hidden = false;
    els.btnStar.disabled = false;
    els.rewardText.textContent = "לחץ על הכוכב!";
    els.coinsPop.hidden = true;

    setUI(); save();
  } else {
    btn.classList.add("wrong");
    state.streak = 0;
    state.wrongAttemptsThisWord += 1;
    els.feedback.textContent = "😅 לא הפעם. נסה שוב או החלף בראולר.";
    if(state.autospeak) speak(state.currentWord);

    els.btnTryAgain.hidden = false;

    els.reward.hidden = true;
    els.btnStar.disabled = true;

    setUI(); save();
  }
}

function randomCoinsBase(){ return 20 + randInt(161); } // 20..180

function claimReward(){
  if(state.rewardClaimed) return;
  if(!state.locked) return;
  state.rewardClaimed = true;

  const base = randomCoinsBase();
  const coins = Math.max(5, base - state.wrongAttemptsThisWord * 25);

  state.coins += coins;
  if(state.coins > 9999) state.coins = 9999;

  els.btnStar.classList.add("burst");
  setTimeout(() => els.btnStar.classList.remove("burst"), 520);

  els.coinsPop.textContent = `+${coins} 🪙`;
  els.coinsPop.hidden = false;

  els.rewardText.textContent = "יאללה! שאלה הבאה…";
  els.btnStar.disabled = true;

  setUI(); save();

  if(state.coins >= 1000) {
    try{ els.winDialog.showModal(); }catch(_ ){}
    return;
  }

  setTimeout(() => startNewQuestion(), 850);
}

function tryAgain(){
  Array.from(els.choices.querySelectorAll(".choiceCard")).forEach(b => b.classList.remove("wrong"));
  els.feedback.textContent = "נסה שוב 🙂";
  els.btnTryAgain.hidden = true;
}

// Settings
function openSettings(){ els.dialog.showModal(); }
function saveSettingsFromDialog(){
  state.autospeak = els.autospeakSelect.value === "on";
  state.rate = parseFloat(els.rateInput.value || "0.95");
  save(); setUI(); els.dialog.close();
}
function resetCoins(){ state.coins = 0; save(); setUI(); }

// Events
els.btnParentToggle.addEventListener("click", toggleLetters);
els.btnCloseLetters.addEventListener("click", closeLetters);
els.btnPickAll.addEventListener("click", pickerSelectAll);
els.btnPickNone.addEventListener("click", pickerSelectNone);
els.btnPresetNadav.addEventListener("click", pickerPresetNadav);
els.lettersDialog.addEventListener("cancel", (e) => { e.preventDefault(); closeLetters(); });

els.btnPlay.addEventListener("click", () => {
  if(!state.chosenBrawlerLetter) openBrawlers();
  else startNewQuestion();
});
els.btnOpenBrawlers.addEventListener("click", openBrawlers);
els.btnChangeBrawler.addEventListener("click", openBrawlers);
els.btnTryAgain.addEventListener("click", tryAgain);

els.btnReveal.addEventListener("click", () => state.revealed ? hideFirstLetter() : revealFirstLetter());
els.btnStar.addEventListener("click", claimReward);

els.btnSound.addEventListener("click", () => { if(state.currentWord) speak(state.currentWord); });
els.btnSettings.addEventListener("click", openSettings);
els.btnSaveSettings.addEventListener("click", saveSettingsFromDialog);

els.btnKeepPlaying.addEventListener("click", () => els.winDialog.close());
els.btnResetCoins.addEventListener("click", () => { resetCoins(); els.winDialog.close(); });

// init
load(); setUI(); show(els.home);
