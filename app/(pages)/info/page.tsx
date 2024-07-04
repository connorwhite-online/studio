import styles from './info.module.css';

export default function Info() {
    return (
        <main className={styles.info}>
            <section className={styles.intro}>
                <p className={styles.introCopy}>
                I&#39;m an independent designer and engineer based in Los Angeles, currently building web experiences with a focus on motion, interaction, and real-time 3D rendering. I work with small and large teams to produce experiences that balance a high level of craft with practicality.
                <br />
                <br />
                My design ethos is rooted in stark minimalism that allows the space for simple elements to exhibit their elegance. Intuitive usability is the foundation of all my visual decisions and motion design.
                <br />
                <br />
                I think you can tell a lot about someone by their living space. I surround myself with objects and furniture I've meticulously collected over the years, avoiding redundancy, and constantly purging that which does not add value.
                <br />
                <br />
                Most products being built today are unimportant, ill-considered, and a waste of valuable resources. Moving forward, I'm prioritizing projects and people bringing beauty into the world or leaving our planet in better shape than they found it. 
                <br />
                <br />
                If that's you, I'd love to hear from you!
                </p>
            </section>
            <section className={styles.directory}>
                <a href="mailto:connorwhite.studio@gmail.com" >
                    <div className={styles.link}>
                        <h2>Email</h2>
                        <h3>connorwhite.studio@gmail.com ↗</h3>
                    </div>
                </a>
                <a href="https://instagram.com/connorwhite.online/" target="_blank" rel="noopener noreferrer">
                    <div className={styles.link}>
                        <h2>Instagram</h2>
                        <h3>@connorwhite.online ↗</h3>
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/connorwhite-online/" target="_blank" rel="noopener noreferrer">
                    <div className={styles.link}>
                        <h2>LinkedIn</h2>
                        <h3>/connorwhite-online ↗</h3>
                    </div>
                </a>
                <a href="https://www.x.com/connor_online" target="_blank" rel="noopener noreferrer">
                    <div className={styles.link}>
                        <h2>Twitter</h2>
                        <h3>@connor_online ↗</h3>
                    </div>
                </a>
            </section>
        </main>
    );
}