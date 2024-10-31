import NavBar from '@/components/NavBar';
import  Providers  from '@/components/Provider'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {/* import client provider   */}
<Providers>
<NavBar/>
{children}

</Providers>
    </div>
  )
}

export default layout