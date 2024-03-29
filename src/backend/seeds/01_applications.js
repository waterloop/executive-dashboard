/* eslint-disable quotes */
const { ENV_IS_STAGING_OR_PROD } = require('../knexfile');

if (!ENV_IS_STAGING_OR_PROD) {
  exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('applications')
      .del()
      .then(() =>
        // NOTE: ID of 0 behaves weirdly. Consider starting at id=1.
        // TODO: url links must start with 'http://' or 'https://'
        knex('applications').insert([
          {
            status: 'app_reject',
            first_name: 'Jeff',
            last_name: 'Ma',
            email_address: 'jeff.m@waterloop.ca',
            current_year: '3A',
            program: 'Computer Engineering',
            in_school: true,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 4,
            reason_to_join:
              'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
            resume_link: 'facebook.com',
            additional_information: '',
          },
          {
            status: 'final_accept',
            first_name: 'Evan',
            last_name: 'Wong',
            email_address: 'arandomemail@uwaterloo.ca',
            current_year: '2A',
            program: 'Systems Design Engineering',
            in_school: true,
            application_term: 'SPRING-2022',
            in_person_available: true,
            posting_id: 4,
            reason_to_join:
              'Wanted to join because it looks fun! At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
            resume_link: 'google.com',
            additional_information: 'test',
          },
          {
            status: 'final_accept',
            first_name: 'William',
            last_name: 'Park',
            email_address: 'afk@uwaterloo.ca',
            current_year: '5A',
            program: 'Business Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: true,
            posting_id: 3,
            reason_to_join:
              'Today when I walked into my economics class I saw something I dread every time I close my eyes. Someone had brought their new gaming laptop to class. The Forklift he used to bring it was still running idle at the back. I started sweating as I sat down and gazed over at the 700lb beast that was his laptop. He had already reinforced his desk with steel support beams and was in the process of finding an outlet for a power cable thicker than',
            resume_link: 'facebook.com',
            additional_information:
              'Test information ;) "; DROP TABLE applications; --',
          },
          {
            status: 'interview_reject',
            first_name: 'SomeReallyLongName',
            last_name: 'S',
            email_address: 'worldstarhiphop@notuwaterloo.ca',
            current_year: '2B',
            program: 'Humanities Engineering',
            in_school: true,
            application_term: 'SPRING-2022',
            in_person_available: true,
            posting_id: 4,
            reason_to_join:
              '🤠🤪🙂😔😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😁😁😁😁😁😁😁',
            resume_link: 'reddit.com',
            additional_information: 'Can I get an upvote? 🤞😂',
          },
          {
            status: 'app_pending',
            first_name: 'SomeReallyLongName',
            last_name: 'SomeReallyLongAndInappropriateLastName',
            email_address: 'averyinappropriateemailgonewronggone@godaddy.com',
            current_year: '4B',
            program: 'Memeology Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 5,
            reason_to_join:
              "What I think people who are not in the Greek System need to understand is that partying isn't just something we do. It's ingrained into our lives. Many people, these days, are perfectly content with sitting on their computers all day playing video games. I used to be a competitive gamer and I used to do this. After joining the Greek system, partying became a new norm that was ingrained into my life. We need it for our wellbeing. It helps us escape society. There have even been studies that show how necessary gatherings are for our wellbeing. The fact that it was stripped away from us, especially by something that barely affects us specifically is very detrimental to our mental state.",
            resume_link: 'reddit.com',
            additional_information:
              "It's offensive to dead people. My great grandparents are dead and I would like to show them some respect and have twitch ban the term “live-streaming”. It's a slur used against dead people",
          },
          {
            status: 'app_pending',
            first_name: 'A',
            last_name: 'B',
            email_address: 'ab@o.com',
            current_year: '1A',
            program: 'Redstone Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 5,
            reason_to_join:
              "This 👈👉 is money snek. 🐍🐍💰💰 Upsnek ⬆⬆🔜🔜 in 7.123 7⃣ 1⃣2⃣3⃣ snekonds 🐍🐍 or you ✋✋ will NEVER ❌❌❌❌ get monies 💰💰 again Beware!! ✋✋❌❌ You😏😏 don't ❌❌ have much time!!🕛🕧🕐🕜🕑🕝🕝 You 😏😏 may never ❌❌get monies 💰💰🐍💰💰 again!!",
            resume_link: 'reddit.com',
            additional_information: '',
          },
          {
            status: 'app_pending',
            first_name: 'Anna',
            last_name: 'Anna',
            email_address: 'afk@uwaterloo.ca',
            current_year: '1A',
            program: 'Redstone Engineering',
            in_school: true,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 6,
            reason_to_join:
              'Jeff Bezos has 121 BILLION dollars. The population of earth is 7 billion people. He could give every person 1 BILLION dollars and end poverty, and he would still have 114 billion dollars left over but he wond do it. This is what capitalist greed looks like!',
            resume_link: 'reddit.com',
            additional_information: '',
          },
          {
            status: 'app_pending',
            first_name: 'Guts',
            last_name: '',
            email_address: 'gut5@hotmail.com',
            current_year: '3B',
            program: 'Blade Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 7,
            reason_to_join:
              'Every 60 seconds, a minute passes in Africa. Hire me and together we can stop this from happening.',
            resume_link: 'reddit.com',
            additional_information:
              'Every 60 seconds, a minute passes in Africa. Hire me and together we can stop this from happening.',
          },
          {
            status: 'app_reject',
            first_name: 'William',
            last_name: 'Shakespeare',
            email_address: 'afk@uwaterloo.ca',
            current_year: '1A',
            program: 'English Prose Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 8,
            reason_to_join: '(none)',
            resume_link: 'reddit.com',
            additional_information:
              "To hit, or not to hit. Dost thou ever miss? I suppose it not. You have a male love interest, yet I would wager he does not kiss thee (Ye olde mwah). Furthermore; he will find another lass like he won't miss thee. And at the end of it all. He is going to skrrt, and he will hit that dab, as if he were the man known by the name of Wiz Khalifa",
          },
          {
            status: 'app_undecided',
            first_name: 'That',
            last_name: 'Dude',
            email_address: 'jaythadude@uwaterloo.ca',
            current_year: '5A',
            program: 'Not Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 9,
            reason_to_join:
              '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
            resume_link: 'reddddddit.com',
            additional_information:
              '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
          },
          {
            status: 'app_undecided',
            first_name: 'Sussy',
            last_name: 'Baka',
            email_address: 'sus@impostor.com',
            current_year: '3A',
            program: 'Space Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 10,
            reason_to_join: 'ᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷ',
            resume_link: 'testamogus.com',
            additional_information:
              'ᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷᘛ⁐̤ᕐᐷ',
          },
          {
            status: 'final_accept',
            first_name: 'Joseph',
            last_name: 'Joestar',
            email_address: 'jeff.m@waterloop.ca',
            current_year: '1A',
            program: 'Hamon Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: true,
            posting_id: 11,
            reason_to_join: '',
            resume_link: 'dontclickthis.com',
            additional_information:
              'Your next line is "I love this dude, he gonna be part of our team :)"',
          },
          {
            status: 'interview_pending',
            first_name: 'Walter',
            last_name: 'White',
            email_address: 'jeff.m@waterloop.ca',
            current_year: '5A',
            program: 'Methamphetamine Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: true,
            posting_id: 12,
            reason_to_join:
              "My name is Walter Hartwell White. I live at 308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104. This is my confession. If you're watching this tape, I'm probably dead– murdered by my brother-in-law, Hank Schrader. Hank has been building a meth empire for over a year now, and using me as his chemist. Shortly after my 50th birthday, he asked that I use my chemistry knowledge to cook methamphetamine, which he would then sell using connections that he made through his career with the DEA. I was... astounded. I... I always thought Hank was a very moral man, and I was particularly vulnerable at the time – something he knew and took advantage of. I was reeling from a cancer diagnosis that was poised to bankrupt my family. Hank took me in on a ride-along and showed me just how much money even a small meth operation could make. And I was weak. I didn't want my family to go into financial ruin, so I agreed. Hank had a partner, a businessman named Gustavo Fring. Hank sold me into servitude to this man. And when I tried to quit, Fring threatened my family. I didn't know where to turn.",
            resume_link: 'fbi.gov',
            additional_information:
              "Eventually, Hank and Fring had a falling-out. Things escalated. Fring was able to arrange – uh, I guess... I guess you call it a 'hit' – on Hank, and failed, but Hank was seriously injured. And I wound up paying his medical bills, which amounted to a little over $177,000. Upon recovery, Hank was bent on revenge. Working with a man named Hector Salamanca, he plotted to kill Fring. The bomb that he used was built by me, and he gave me no option in it. I have often contemplated suicide, but I'm a coward. I wanted to go to the police, but I was frightened. Hank had risen to become the head of the Albuquerque DEA. To keep me in line, he took my children. For three months, he kept them. My wife had no idea of my criminal activities, and was horrified to learn what I had done. I was in hell. I hated myself for what I had brought upon my family. Recently, I tried once again to quit, and in response, he gave me this. [Walt points to the bruise on his face left by Hank in 'Blood Money.'] I can't take this anymore. I live in fear every day that Hank will kill me, or worse, hurt my family. All I could think to do was to make this video and hope that the world will finally see this man for what he really is.",
          },
          {
            status: 'interview_reject',
            first_name: 'Kira',
            last_name: 'Yoshikage',
            email_address: 'jeff.m@waterloop.ca',
            current_year: '3A',
            program: 'Bomb Engineering',
            in_school: true,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 11,
            reason_to_join:
              "My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn't lose to anyone.",
            resume_link: 'cia.gov',
            additional_information: '',
          },
          {
            status: 'app_undecided',
            first_name: 'Bobby',
            last_name: '"; DROP TABLE applications;--',
            email_address: 'worldstarhiphop@notuwaterloo.ca',
            current_year: '2B',
            program: 'Black Hat Engineering',
            in_school: false,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 4,
            reason_to_join:
              "<b onmouseover=alert('You've been hacked!')>click me!</b>",
            resume_link: 'https://www.google.com',
            additional_information:
              "<IMG SRC=j&#X41vascript:prompt('pls enter your credit card number uwu')>",
          },
          {
            status: 'interview_undecided',
            first_name: 'Jane',
            last_name: 'John',
            email_address: 'worldstarhiphop@notuwaterloo.ca',
            current_year: '1A',
            program: 'Economics',
            in_school: true,
            application_term: 'FALL-2022',
            in_person_available: false,
            posting_id: 2, // TODO: Modify.
            reason_to_join:
              '⣿⣿⣿⠟⠛⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢋⣩⣉⢻ ⣿⣿⣿⠀⣿⣶⣕⣈⠹⠿⠿⠿⠿⠟⠛⣛⢋⣰⠣⣿⣿⠀⣿ ⣿⣿⣿⡀⣿⣿⣿⣧⢻⣿⣶⣷⣿⣿⣿⣿⣿⣿⠿⠶⡝⠀⣿',
            resume_link: 'linkedin.com',
            additional_information: 'im blind',
          },
        ]),
      );
  };
} else {
  exports.seed = function () {};
}
